import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { Button, Divider, Spinner, Text } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@/hooks/useAuth';
import { useBackend } from '@/hooks/useBackend';



const Profile  = () => {
  const navigation = useNavigation();
  const{onLogout} = useAuth();
  const{fetchData} = useBackend();
  const[userInfo, setUserInfo] = useState<any>();


  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const data = await fetchData!('http://10.0.2.2:8080/user/getUserInfo');
        setUserInfo(data);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    getUserInfo();
  }, []);

  const logout = async () => {
    const result = await onLogout!();
    if (result && result.error) {
        alert(result.msg);
    }
};

  if (!userInfo) {
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <Text category="h4">Loading...</Text>
          <Spinner />
          <Button
        style={styles.button}
        onPress={logout}
        status='danger'
      >
        <Text style={{ textAlign: 'center' }}>
          Выйти
        </Text>
      </Button>
        </View>
      </SafeAreaView>
    );
  }

  



  return (
    <SafeAreaView>
    <View style={styles.container}>
      <Text category="h4">
        {`${userInfo.lastName} ${userInfo.firstName}`}
      </Text>
      <Text category='s1'>
        {`г.${userInfo.flatDtos[0].city},${userInfo.flatDtos[0].street} ${userInfo.flatDtos[0].houseNumber},кв.${userInfo.flatDtos[0].flatNumber}`}
      </Text>
      <Divider style={{
        marginTop: 20,
        borderColor: 'black',
        borderWidth: 0.5,
        width: '100%'
      }} />
      <Button
        style={styles.button}
        onPress={() =>  navigation.navigate('ChangeTelephoneNumber')}
      >
        <Text style={{ textAlign: 'center' }}>
          Изменить номер телефона
        </Text>
      </Button>
      <Button
        style={styles.button}
        onPress={() =>  navigation.navigate('ConnectFlat', { userLogin: userInfo.login })}
      >
        <Text style={{ textAlign: 'center' }}>
          Пивязать квартиру
        </Text>
      </Button>
      <Button
        style={styles.button}
        onPress={() => navigation.navigate('AddNewCounter', { flatDtos: userInfo.flatDtos })}
      >
        <Text style={{ textAlign: 'center' }}>
          Добавить счетчик
        </Text>
      </Button>
      <Button
        style={styles.button}
        status='warning'
        onPress={() => navigation.navigate('DeleteCounter', { flatDtos: userInfo.flatDtos })}
      >
        <Text style={{ textAlign: 'center' }}>
          Удалить счетчик
        </Text>
      </Button>
      <Button
        style={styles.button}
        onPress={logout}
        status='danger'
      >
        <Text style={{ textAlign: 'center' }}>
          Выйти
        </Text>
      </Button>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 15,
    marginTop: 26,
    width: '75%',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 26,
  }
})



export default Profile;