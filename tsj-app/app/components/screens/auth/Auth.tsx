import { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
    Keyboard,
    TouchableWithoutFeedback,
    View,
    StyleSheet
} from 'react-native';
import { IAuthFormData } from '@/types/auth.interface';
import Loader from '@/ui/Loader';
import { Button, Icon, Input, InputProps, Text } from '@ui-kitten/components';
import { AppConstants } from '@/app.constants';
import { useAuth } from '@/hooks/useAuth';
import { IUser } from '@/types/user.interface';

const AlertIcon = (props: any) => (
    <Icon
        {...props}
        name='alert-circle-outline'
    />
);

const useInputState = (initialValue = ''): InputProps => {
    const [value, setValue] = useState(initialValue);
    return { value, onChangeText: setValue };
};

const Auth: FC = () => {
    const [isReg, setIsReg] = useState(true);
    const { onLogin, onRegister } = useAuth();



    const { control, handleSubmit, formState: { errors } } = useForm({
        mode: 'onChange'
    });

    const [secureTextEntry, setSecureTextEntry] = useState(true);

    const toggleSecureEntry = (): void => {
        setSecureTextEntry(!secureTextEntry);
    };

    const renderIcon = (props: any): React.ReactElement => (
        <TouchableWithoutFeedback onPress={toggleSecureEntry}>
            <Icon
                name={secureTextEntry ? 'eye-off-outline' : 'eye-outline'}
                {...props}
            />
        </TouchableWithoutFeedback>
    );

    const renderCaption = (): React.ReactElement => {
        return (
            <View style={styles.captionContainer}>
                {AlertIcon(styles.captionIcon)}
                <Text style={styles.captionText}>
                    Должен содержать больше 8 символов
                </Text>
            </View>
        );
    };

    const onSubmit = async (data: any) => {
        // Check for missing data in the fields
        if (!data.login || !data.password) {
            // If there are missing fields, alert the user to fill in all required fields
            alert('Пожалуйста введите все данные.');
        } else {
            // If there are no missing fields, proceed with the login or registration
            if (isReg) {
                if (!data.login || !data.password) {
                    // If there are missing fields, alert the user to fill in all required fields
                    alert('Пожалуйста введите все данные.');
                } else {
                const result = await onLogin!(data.login, data.password);
                if (result && result.error) {
                    alert(result.msg);
                }}
            } else {
                if (!data.login || !data.password) {
                    // If there are missing fields, alert the user to fill in all required fields
                    alert('Пожалуйста введите все данные(кроме отчества если отсутсвует).');
                } else {
                const userData = { ...data, _id: '' };
                const result = await onRegister!(userData);
                if (result && result.error) {
                    alert(result.msg);
                }}
            }
        }
    };

    const isLoading = false;

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View className='items-center justify-center flex-1 '>
                <View className='w-5/6'>
                    <Text category={'h2'} className={'text-2xl text-black text-center font-bold'}>
                        {isReg ? 'Авторизация' : 'Регистрация'}
                    </Text>
                    {isLoading ? <Loader /> : <>
                    {isReg ? <>
                            <Controller
                                        control={control}
                                        name="login"
                                        rules={{ required: 'Необходим логин' }}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <Input
                                                label='Логин'
                                                placeholder='Введите логин'
                                                onBlur={onBlur}
                                                onChangeText={onChange}
                                                value={value}
                                                size='large'
                                                style={styles.input}
                                                status={errors.login ? 'danger' : 'basic'}
                                                caption={errors.login ? errors.login.message : undefined}
                                            />
                                        )}
                                    />
                               <Controller
                                        control={control}
                                        name="password"
                                        rules={{
                                            required: 'Необходим пароль',
                                            minLength: {
                                                value: 8,
                                                message: 'Пароль должен быть минимум 8 символов'
                                            }
                                        }}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <Input
                                                label='Пароль'
                                                placeholder='Введите пароль'
                                                status={errors.password ? 'danger' : 'basic'}
                                                caption={errors.password ? errors.password.message : undefined}
                                                accessoryRight={renderIcon}
                                                secureTextEntry={secureTextEntry}
                                                onBlur={onBlur}
                                                onChangeText={onChange}
                                                value={value}
                                                size='large'
                                                style={styles.input}
                                            />
                                        )}
                                    />
                                        </> : 
                                        <>
                                <Controller
                                    control={control}
                                    name="firstName"
                                    rules={{ required: 'Необходимо имя' }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <Input
                                            label='Имя'
                                            placeholder='Введите имя'
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            size='large'
                                            style={styles.input}
                                            status={errors.firstName ? 'danger' : 'basic'}
                                            caption={errors.firstName ? errors.firstName.message : undefined}
                                        />
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name="lastName"
                                    rules={{ required: 'Необходима фамилия' }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <Input
                                            label='Фамилия'
                                            placeholder='Введите фамилию'
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            size='large'
                                            style={styles.input}
                                            status={errors.lastName ? 'danger' : 'basic'}
                                            caption={errors.lastName ? errors.lastName.message : undefined}
                                        />
                                    )}
                                />
                                 <Controller
                                    control={control}
                                    name="surname"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <Input
                                            label='Отчество'
                                            placeholder='Введите отчество'
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            size='large'
                                            style={styles.input}
                                            
                                        />
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name="phoneNumber"
                                    rules={{
                                        required: 'Phone number is required',
                                        pattern: {
                                            value: /^\+?\d{10,}$/,
                                            message: 'Неправильный номер телефона'
                                        }
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <Input
                                            label='Номер телефона'
                                            placeholder='+7(XXX)XXXXXXX'
                                            status={errors.phoneNumber ? 'danger' : 'basic'}
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            size='large'
                                            style={styles.input}
                                            caption={errors.phoneNumber ? errors.phoneNumber.message : undefined}
                                    />
                                    )}
                                    />
                  
                                    <Controller
                                        control={control}
                                        name="login"
                                        rules={{ required: 'Необходим логин' }}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <Input
                                                label='Логин'
                                                placeholder='Введите логин'
                                                onBlur={onBlur}
                                                onChangeText={onChange}
                                                value={value}
                                                size='large'
                                                style={styles.input}
                                                status={errors.login ? 'danger' : 'basic'}
                                                caption={errors.login ? errors.login.message : undefined}
                                            />
                                        )}
                                    />
                                    <Controller
                                        control={control}
                                        name="password"
                                        rules={{
                                            required: 'Необходим пароль',
                                            minLength: {
                                                value: 8,
                                                message: 'Пароль должен быть минимум 8 символов'
                                            }
                                        }}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <Input
                                                label='Пароль'
                                                placeholder='Введите пароль'
                                                status={errors.password ? 'danger' : 'basic'}
                                                caption={errors.password ? errors.password.message : undefined}
                                                accessoryRight={renderIcon}
                                                secureTextEntry={secureTextEntry}
                                                onBlur={onBlur}
                                                onChangeText={onChange}
                                                value={value}
                                                size='large'
                                                style={styles.input}
                                            />
                                        )}
                                    />
                                        </>
                            }                 
                                  
                        <Button className='w-screen mx-18'
                            style={{
                                backgroundColor: AppConstants.primary,
                                borderRadius: 15,
                            }}
                            onPress={handleSubmit(onSubmit)}>
                            <Text className='text-center mx-10'>
                                {isReg ? 'Войти' : 'Зарегестрироваться'}
                            </Text>
                        </Button>
                        <Button onPress={() => setIsReg(!isReg)} style={{
                            bottom: -50,
                            borderRadius: 15,
                        }}>
                            <Text className='text-center text-opacity-60'>
                                {isReg ? 'Регистрация' : 'Авторизация'}
                            </Text>
                        </Button>
                    </>}
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    captionContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    captionIcon: {
        width: 10,
        height: 10,
        marginRight: 5,
    },
    captionText: {
        fontSize: 12,
        fontWeight: '400',
        color: '#8F9BB3',
    },
    input: {
        marginBottom: 10,
        borderRadius: 15,
        width: '100%',
    },
    
});

export default Auth;