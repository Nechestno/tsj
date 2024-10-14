import React, { FC, useEffect, useState } from 'react';
import { View, StyleSheet, Image, Alert } from 'react-native'
import { Button, Text, IndexPath, Select, SelectItem, TextProps, Input, InputProps } from '@ui-kitten/components'
import { RenderProp } from '@ui-kitten/components/devsupport'
import * as ImagePicker from 'expo-image-picker';
import { AppConstants } from '@/app.constants'
import { useBackend } from '@/hooks/useBackend';


const Values: FC = () => {

  const [selectedIndex, setSelectedIndex] = useState<IndexPath | IndexPath[]>(new IndexPath(0));
  const [serialNumber, setSerialNumber] = useState<any[]>([]);
  const [serialNumberName, setSerialNumberName] = useState('');
  const [serialNumberId, setSerialNumberId] = useState('');
  const [flatId, setFlatId] = useState('');
  const [value, setValue] = useState('');
  const { fetchData, postData } = useBackend();
  

  useEffect(() => {
    const getSerialNumber = async () => {
      try {
        const data = await fetchData!('http://10.0.2.2:8080/meter/getAllMetersByUser');
        setSerialNumber(data);
        if (data.length > 0) {
          setSerialNumberName(data[0].serialNumber);
          setSerialNumberId(data[0].id);
          setFlatId(data[0].flatDto.flatId);

        }
      } catch (error) {
        console.error('Error fetching resources:', error);
      }
    };

    getSerialNumber();
  }, []);

  
  const addNewHistoryValueByHand = async () => {
    const valueHistoryData = {
      value: value ,
      date: new Date,
      meterId: serialNumberId,
      cost: 1,
    };
    console.log(valueHistoryData);
    console.log(flatId)
    try {
      const result = await postData!(`http://10.0.2.2:8080/valueHistory/submit`,valueHistoryData, {flatId} );
      // Display an alert upon successful phone number update
      Alert.alert(
        'Success',
        'Показание успешно отправлено',
        [
          { text: 'OK', onPress: () => {} }  // Navigate to the profile page on OK press
        ]
      );
} catch (e) {
  console.error("Login error:", e);
        return { error: true, msg: (e as any).response?.data?.msg || "An error occurred" };
}
};

  const handleSelect = (index: any) => {
    setSelectedIndex(index);
    setSerialNumberName(serialNumber[index.row].serialNumber);
    setSerialNumberId(serialNumber[index.row].id)
    setFlatId(serialNumber[index.row].flatDto.flatId)
  };


  // const [image, setImage] = useState(null);
  const [isPhoto, setIsPhoto] = useState(false);


  // const selectImage = async () => {
  //   const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  //   if (permissionResult.granted === false) {
  //     // Проверяем разрешения на доступ к медиабиблиотеке
  //     alert('Доступ к галерее не разрешен!');
  //     return;
  //   }

  //   const pickerResult = await ImagePicker.launchImageLibraryAsync();
  //   if (pickerResult.canceled === true) {
  //     // Проверяем, была ли выбрана фотография или операция была отменена
  //     return;
  //   }

  //   setImage(pickerResult.uri); // Устанавливаем выбранную фотографию в состояние
  // };

  return(
      <View className='flex-1 items-center  my-6 '>
          <Text category='h6'>Выберите счетчик</Text>
        <Select
          style={styles.select}
          placeholder='Default'
          value={serialNumberId !== '0' ? serialNumberName : 'Выберите счетчик' }
          selectedIndex={selectedIndex}
          onSelect={handleSelect}
        >
          {serialNumber.map((serialNumber, index) => (
          <SelectItem key={serialNumber.id} title={serialNumber.serialNumber} />
        ))}
        </Select>
        <View style={{
          display:'flex',
          flexDirection:'row',
        
        }}>
          {/* <Button style={{
            marginRight:20,
            borderRadius: 15,
            width: '37%'
          }}
          onPress={() => setIsPhoto(true)}>
            По фото</Button>
          <Button style={styles.button}
          onPress={() => setIsPhoto(false)}>
            Вручную</Button> */}
        </View>
        {isPhoto ? <>
          {/* <Button style={styles.button} onPress={selectImage}> Выберите фото </Button>
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        <Input style={styles.input}></Input> */}
        </> : <>
        <Text category='h6' style={{marginTop: 10}}>Показание счетчика</Text>
        <Input style={styles.input} placeholder={'Введите показание'} status='primary' onChangeText={(value) => {setValue(value)}}></Input>
        </> }
        <Button style={styles.button} onPress={addNewHistoryValueByHand} > Отправить показание </Button>
      </View>
    )
}
const styles = StyleSheet.create({
  container: {
    minHeight: 128,
  },
  select: {
    width: '75%',
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
    width: '75%',
    borderRadius: 15,
  }

});

export default Values