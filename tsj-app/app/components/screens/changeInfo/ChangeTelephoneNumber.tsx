import { View, StyleSheet, Alert } from 'react-native';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, Text, Input } from '@ui-kitten/components';
import axios from 'axios';
import { useBackend } from '@/hooks/useBackend';
import { useNavigation } from '@react-navigation/native';

const ChangeTelephoneNumber = () => {
   
  const {patchData} = useBackend();    
  const navigation = useNavigation();

  const { control, handleSubmit, formState: { errors } } = useForm({
    mode: 'onChange'
  });

  const onSubmit = async (data: any) => {
    try {
          const params = { newPhoneNumber: data.newPhoneNumber };
          const result = await patchData!(`http://10.0.2.2:8080/user/setPhoneNumber`, params);
    
          // Display an alert upon successful phone number update
          Alert.alert(
            'Success',
            'Номер телефона успешно обновлен',
            [
              { text: 'OK', onPress: () => navigation.navigate('Profile') }  // Navigate to the profile page on OK press
            ]
          );
    } catch (e) {
      console.error("Login error:", e);
            return { error: true, msg: (e as any).response?.data?.msg || "An error occurred" };
    }
  };

  return (
    <View style={styles.container}>
      <Text category='s1'>Введите новый номер телефона</Text>
      <Controller
        control={control}
        name="newPhoneNumber"
        rules={{
          required: 'Номер телефона обязателен',
          pattern: {
            value: /^\+7\d{10}$/,
            message: 'Введите корректный номер телефона'
          }
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            size='large'
            status={errors.newPhoneNumber ? 'danger' : 'primary'}
            style={styles.input}
            placeholder='+7(XXX)XXXXXXX'
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            caption={errors.newPhoneNumber ? errors.newPhoneNumber.message : ''}
          />
        )}
      />
      <Button style={styles.button} onPress={handleSubmit(onSubmit)}>Изменить</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 24,
  },
  button: {
    marginTop: 18,
    borderRadius: 15,
    width: '75%',
  },
  input: {
    paddingTop: 18,
    width: 300,
    borderRadius: 15,
  }
});

export default ChangeTelephoneNumber;