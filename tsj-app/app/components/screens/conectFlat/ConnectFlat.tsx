import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { IndexPath, Select, SelectItem, Input, Button, Text, Datepicker } from '@ui-kitten/components';
import axios from 'axios';
import { useBackend } from '@/hooks/useBackend';
import { useNavigation, useRoute } from '@react-navigation/native';


const ConnectFlat = () => {
  const [address, setAddress] = useState<any[]>([]);
  const [serialNumber, setSerialNumber] = useState('');
  const [flatId, setFlatId] = useState();
  const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));
  const [selectedResourceName, setSelectedResourceName] = useState('');
  const [selectedResourceId, setSelectedResourceId] = useState(0);
  const [date, setDate] = useState(new Date());
  const [userId, setUserId] = useState()
  const [selectedFlatIndex, setSelectedFlatIndex] = useState<any>(new IndexPath(1));
  const { fetchData, postData } = useBackend();
  const route = useRoute();
  const userLogin = route.params.userLogin;
  const [selectedFlat, setSelectedFlat] = useState<any>();
  const navigation = useNavigation();
  console.log(selectedFlat);

  useEffect(() => {
    const getResource = async () => {
      try {
        const data = await fetchData!('http://10.0.2.2:8080/flat/getAll');
        setAddress(data);
        if (data.length > 0) {
          setSelectedFlat(data[0]);  // Установка первого адреса в качестве выбранного
        }
      } catch (error) {
        console.error('Error fetching resources:', error);
      }
    };
    console.log(address)
    const getUsers = async () => {
      try {
        const users = await fetchData!('http://10.0.2.2:8080/user/getAll');
        // Предполагаем, что users - это массив объектов
        const user = users.find(user => user.login === userLogin);
        if (user) {
          setUserId(user.id);
        } else {
          console.log("Пользователь не найден");
        }
      } catch (error) {
        console.error('Error fetching resources:', error);
      }
    };

    getResource();
    getUsers();
  }, []);
  const connectFlat = async () => {
    
  
    try {
      const result = await postData!(`http://10.0.2.2:8080/flat/saveLinkWithoutRole`,{}, { userId:userId, flatId:flatId, role: 'OWNER'});

      // Display an alert upon successful phone number update
      Alert.alert(
        'Success',
        'Квартира успешно привязана',
        [
          { text: 'OK', onPress: () => navigation.navigate('Profile') }  // Navigate to the profile page on OK press
        ]
      );
} catch (e) {
  console.error("Login error:", e);
        return { error: true, msg: (e as any).response?.data?.msg || "An error occurred" };
}
};

  const handleSelect = (index: any) => {
    setSelectedIndex(index);
    setSelectedResourceId(address[index.row].id)
    setFlatId(address[index.row].id)
  };
  console.log(flatId);
  return (
    <View style={styles.container}>
      <Text category='s1'>Выберите квартиру</Text>
      <Select
        style={styles.select}
        value={selectedFlat ? `${selectedFlat.address.city}, ${selectedFlat.address.street} ${selectedFlat.address.houseNumber}, кв. ${selectedFlat.number}` : "Выберите квартиру"}
        selectedIndex={selectedFlatIndex}
        onSelect={index => {
          setSelectedFlatIndex(index);
          setSelectedFlat(address[index.row]);
          handleSelect(index)
        }}
      >
        {address.map((address: any, index: any) => (
          <SelectItem key={index} title={`${address.address.city}, ${address.address.street} ${address.address.houseNumber}, кв. ${address.number}`} />
        ))}
      </Select>
      <Button style={styles.button} onPress={connectFlat}>Добавить</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 24,
  },
  select: {
    width: 300,
    marginTop: 8,
    borderRadius: 15,
  },
  button: {
    marginTop: 18,
    borderRadius: 15,
    width: '75%'
  },
  input: {
    paddingTop: 18,
    width: 300,
    borderRadius: 15,
  }
});

export default ConnectFlat