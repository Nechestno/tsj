import React, { FC, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text, IndexPath, Select, SelectItem, List, ListItem } from '@ui-kitten/components';
import { useBackend } from "@/hooks/useBackend";
import moment from "moment";

const Home: FC = () => {
    const { fetchData, postData } = useBackend();

    const [selectedIndex, setSelectedIndex] = useState<IndexPath | IndexPath[]>(new IndexPath(0));
    const [serialNumber, setSerialNumber] = useState<any[]>([]);
    const [serialNumberName, setSerialNumberName] = useState('');
    const [serialNumberId, setSerialNumberId] = useState('');
    const [historyData, setHistoryData] = useState<any[]>([]);

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


    const fetchHistory = async () => {
        try {
            const history = await fetchData!(`http://10.0.2.2:8080/valueHistory/getAllByMeterId?meterId=${serialNumberId}`);
            setHistoryData(history);
        } catch (error) {
            console.error('Error fetching history:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text category="h5">История показаний</Text>
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
            <Button style={styles.button} onPress={fetchHistory}>Показать историю по счетчику</Button>
            <List
                data={historyData}
                renderItem={({ item }) => <ListItem style={styles.listItem} title={`Дата: ${moment(item.date).format('DD-MM-YYYY HH:mm:ss')} | Показание:${item.value}`} />}
                style={styles.list}
            />
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

export default Home;