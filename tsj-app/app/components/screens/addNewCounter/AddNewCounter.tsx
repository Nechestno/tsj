import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { IndexPath, Select, SelectItem, Input, Button, Text, Datepicker } from '@ui-kitten/components';
import axios from 'axios';
import { useBackend } from '@/hooks/useBackend';
import { useNavigation, useRoute } from '@react-navigation/native';



interface ICounter {
  serialNumber: string
  resourceId: number
  installationDate: Date
  flatDto: {
    flatId: number
    flatNumber: number
    city: string
    street: string
    houseNumber: number
    tsjName: string
  }
}



const AddNewCounter = () => {
  const [resources, setResources] = useState<any[]>([]);
  const [serialNumber, setSerialNumber] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));
  const [selectedResourceName, setSelectedResourceName] = useState('');
  const [selectedResourceId, setSelectedResourceId] = useState(1);
  const [date, setDate] = useState(new Date());
  const [selectedFlatIndex, setSelectedFlatIndex] = useState<any>(new IndexPath(1));
  const { fetchData, postData } = useBackend();
  const route = useRoute();
  const flatDtos = route.params.flatDtos;
  const [selectedFlat, setSelectedFlat] = useState<any>(flatDtos[0]);
  const navigation = useNavigation();
  console.log(selectedFlat);

  useEffect(() => {
    const getResource = async () => {
      try {
        const data = await fetchData!('http://10.0.2.2:8080/resource/getAll');
        setResources(data);
        if (data.length > 0) {
          setSelectedResourceName(data[0].name); // Set initial display name
        }
      } catch (error) {
        console.error('Error fetching resources:', error);
      }
    };

    getResource();
  }, []);

  const addNewCounter = async () => {
    const counterData: ICounter = {
      serialNumber: serialNumber,
      resourceId: selectedResourceId,
      installationDate: date,
      flatDto: selectedFlat
    };
    console.log(counterData);
  
    try {
      const result = await postData!(`http://10.0.2.2:8080/meter/addByMeterDto`,counterData, {});

      // Display an alert upon successful phone number update
      Alert.alert(
        'Success',
        'Счетчик успешно добавлен',
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
    setSelectedResourceName(resources[index.row].name);
    setSelectedResourceId(resources[index.row].id)
  };

  return (
    <View style={styles.container}>
      <Text category='s1'>Введите серийный номер счетчика</Text>
      <Input style={styles.input} status='primary' onChangeText={(value) => {setSerialNumber(value)}} />
      <Text category='s1'>Выберите тип счетчика</Text>
      <Select
        style={styles.select}
        value={selectedResourceName} // Display the selected resource name
        selectedIndex={selectedIndex}
        onSelect={handleSelect}
      >
        {resources.map((resource) => (
          <SelectItem key={resource.id} title={resource.name} />
        ))}
      </Select>
      <Text category='s1'>Выберите дату установки</Text>
      <Datepicker
        date={date}
        style={styles.select}
        onSelect={nextDate => setDate(nextDate)}
      />
      <Text category='s1'>Выберите квартиру</Text>
      <Select
        style={styles.select}
        value={`${selectedFlat.city}, ${selectedFlat.street} ${selectedFlat.houseNumber}, кв. ${selectedFlat.flatNumber}`}
        selectedIndex={selectedFlatIndex}
        onSelect={index => {
          setSelectedFlatIndex(index);
          setSelectedFlat(flatDtos[index.row]);
        }}
      >
        {flatDtos.map((flat: any, index: any) => (
          <SelectItem key={index} title={`${flat.city}, ${flat.street} ${flat.houseNumber}, кв. ${flat.flatNumber}`} />
        ))}
      </Select>
      <Button style={styles.button} onPress={addNewCounter}>Добавить</Button>
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

export default AddNewCounter;