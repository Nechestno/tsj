import React, { FC, useEffect, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Button, Text, IndexPath, Select, SelectItem, List, ListItem } from '@ui-kitten/components';
import { useBackend } from "@/hooks/useBackend";
import moment from "moment";
import { useNavigation, useRoute } from "@react-navigation/native";

const DeleteCounter: FC = () => {
    const { fetchData, deleteData} = useBackend();

    const [selectedIndex, setSelectedIndex] = useState<IndexPath | IndexPath[]>(new IndexPath(0));
    const [serialNumber, setSerialNumber] = useState<any[]>([]);
    const [serialNumberName, setSerialNumberName] = useState('');
    const [serialNumberId, setSerialNumberId] = useState('');
    const [historyData, setHistoryData] = useState<any[]>([]);
    const [selectedFlatIndex, setSelectedFlatIndex] = useState<any>(new IndexPath(1));
    const [flatId, setSelectedFlatId] = useState('');
    
     const navigation = useNavigation();
    
    const route = useRoute();
    const flatDtos = route.params.flatDtos;
    const [selectedFlat, setSelectedFlat] = useState<any>(flatDtos[0]);

    useEffect(() => {
        const getSerialNumber = async () => {
            try {
                const data = await fetchData!('http://10.0.2.2:8080/meter/getAllMetersByUser');
                setSerialNumber(data);
                if (data.length > 0) {
                    setSerialNumberName(data[0].serialNumber);
                    setSerialNumberId(data[0].id);
                }
            } catch (error) {
                console.error('Error fetching resources:', error);
            }
        };
        getSerialNumber();
    }, []);

    const handleSelect = (index: any) => {
        setSelectedIndex(index);
        setSerialNumberName(serialNumber[index.row].serialNumber);
        setSerialNumberId(serialNumber[index.row].id);
    };


    const deleteCounter = async () => {
        try {
            const history = await deleteData!(`http://10.0.2.2:8080/meter/deleteMeterById`, {}, {meterId: serialNumberId, flatId: flatId});
            setHistoryData(history);
            
            Alert.alert(
                'Success',
                'Счетчик успешно удален',
                [
                  { text: 'OK', onPress: () => navigation.navigate('Profile') }  // Navigate to the profile page on OK press
                ]
              );
        } catch (error) {
            console.error('Error fetching history:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text category="s1">Выберите счетчик который необходимо удалить</Text>
            <Select
                style={styles.select}
                value={serialNumberName ? serialNumberName : ''}
                selectedIndex={selectedIndex}
                onSelect={handleSelect}
            >
                {serialNumber.map((item, index) => (
                    <SelectItem key={item.id} title={item.serialNumber} />
                ))}
            </Select>
            <Text category="s1">Выберите квартиру в которой находится счетчик</Text>
            <Select
        style={styles.select}
        value={`${selectedFlat.city}, ${selectedFlat.street} ${selectedFlat.houseNumber}, кв. ${selectedFlat.flatNumber}`}
        selectedIndex={selectedFlatIndex}
        onSelect={index => {
          setSelectedFlatIndex(index);
          setSelectedFlat(flatDtos[index.row]);
          setSelectedFlatId(flatDtos[index.row].id);
        }}
      >
        {flatDtos.map((flat: any, index: any) => (
          <SelectItem key={index} title={`${flat.city}, ${flat.street} ${flat.houseNumber}, кв. ${flat.flatNumber}`} />
        ))}
      </Select>
            <Button style={styles.button} onPress={deleteCounter}>Удалить счетчик</Button>
        </View>
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
    },
    select: {
        width: 300,
        marginTop: 8,
        borderRadius: 15,
    },
    list: {
        marginTop: 15,
        width: '75%',
        fontSize: 20,
        backgroundColor: 'transparent'
    },
    listItem: {
        borderColor: 'black',
        borderWidth: 1,
        marginTop: 5,
        borderRadius: 15, 
    }
});

export default DeleteCounter;