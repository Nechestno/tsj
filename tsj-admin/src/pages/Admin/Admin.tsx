import { Space, Button, Form, DatePicker, MenuProps, Dropdown } from 'antd';
import './index.css';
import React, { useState } from 'react';
import SelectTsj from '../../components/selects/SelectTsj.tsx';
import SelectStreet from '../../components/selects/SelectStreet.tsx';
import { Dayjs } from 'dayjs';
import SelectUsers from '../../components/selects/SelectUsers.tsx';
import SelectFlat from '../../components/selects/SelectFlat.tsx';
import TableValuesByDate from '../../components/tables/TableValuesByDate.tsx';
import TableValuesByDateAndLogin from '../../components/tables/TableValuesByDateAndLogin.tsx';
import TableValuesByDateAndStreet from '../../components/tables/TabeValuesByDateAndStreet.tsx';
import TableTsjXlsx from '../../components/tables/TableTsjXlsx.tsx';
import TableUserInfoByTsj from '../../components/tables/TableUsersInfoByTsj.tsx';
import TableUserInfoByFlatId from '../../components/tables/TableUserInfoByFlatId.tsx';
import TableAllRenterAndFlats from '../../components/tables/TableAllRenterAndFlats.tsx';
import CreateAddModal from '../../components/modals/CreateAddModal.tsx';


const { RangePicker } = DatePicker;


const items: MenuProps['items'] = [
    {
        label: 'Все данные приборов учета за определенный период',
        key: '1',
    },
    {
        label: 'Данные приборов учета пользователя за определенный период',
        key: '2',
    },
    {
        label: 'Данные приборов учета конкретного дома за определенный период',
        key: '3',
    },
    {
        label: 'Все ТСЖ и их ресурсоснабжающие организации (отчет в xlsx)',
        key: '4',
    },
    {
        label: 'Информация о жильцах по ТСЖ',
        key: '5',
    },
    {
        label: 'Информация о жильцах по квартире',
        key: '6',
    },
    {
        label: 'Вывод всех арендаторов',
        key: '7',
    },
];



const Admin: React.FC = () =>{

    const [tsj, setTsj] = useState('');
    const [user, setUser] = useState('');
    const [selectedKey, setSelectedKey] = useState('');
    const [selectedFlatKey, setSelectedFlatKey] = useState('');
    const [selectedKeyAddress, setSelectedAddressKey] = useState('');
    const [date, setDate] = useState([Dayjs]);
    const [selectedTable, setSelectedTable] = useState('');
    const onChange = ( value: any ) => {
            setTsj(value);
            setSelectedKey(value.key);

    };
    const onChangeDate = (value: Da) => {
        setDate(value);
    };
    const onChangeUser = (value: any) => {
        setUser(value)
    };
    const onChangeStreetKey = (value: any ) => {
        const selectedOptionKey = value.key;
        setSelectedAddressKey(selectedOptionKey);
    };

    const onChangeFlatKey = (value : any) => {
        const selectedOptionKey = value.key;
        setSelectedFlatKey(selectedOptionKey);
    };
    const handleMenuClick: MenuProps['onClick'] = (e) => {

        switch (e.key){
            case '1':
                if (!date || date.length !== 2) {
                    alert('Введите дату!');
                }
                else{
                    setSelectedTable('table1');
                }
                break;
            case '2':
                if (!date || date.length !== 2 || !user) {
                    alert('Введите дату и выберите пользователя!');
                }
                else {
                    setSelectedTable('table2');
                }
                break;
            case '3':
                if (!date || date.length !== 2 || !selectedKeyAddress) {
                    alert('Введите дату и выберите дом!');
                }
                else {
                    setSelectedTable('table3');
                }
                break;
            case '4':
                    setSelectedTable('table4');
                break;
            case '5':
                if (!tsj) {
                    alert('Выберите Тсж!');
                }
                else {
                    setSelectedTable('table5');
                }
                break;
            case '6':
                if (!selectedKeyAddress || !selectedFlatKey) {
                    alert('Выберите адрес и квартиру!');
                }
                else {
                    setSelectedTable('table6');
                }
                break;
            case '7':
                    setSelectedTable('table7');
                break;
        }
    };

    const menuProps = {
        items,
        onClick: handleMenuClick,
    };

    return(
      <>
          <div className="form-filter-wrapper">
          <Form variant="filled" >

              <Form.Item label="Выберите ТСЖ"  name="Select" >
                  <SelectTsj onChange={onChange}/>
              </Form.Item>

              <Form.Item label="Выберите дом" name="Select2">
                  <SelectStreet onChange={onChangeStreetKey}>
                  </SelectStreet>
              </Form.Item>
              <Form.Item label="Выберите квартиру" name="Select5" >
                  <SelectFlat onChange={onChangeFlatKey}/>
              </Form.Item>
              <Form.Item label="Выберите пользователя" name="Select3" >
                  <SelectUsers onChange={onChangeUser}/>
              </Form.Item>
 
              <Form.Item
                label="Выберите дату"
                name="RangePicker"
              >
                  <RangePicker onChange={onChangeDate} />
              </Form.Item>

              <Form.Item className='form-item-btn' >
                  <Dropdown menu={menuProps}>
                      <Button style={{backgroundColor: '#1890FF', color: 'white', width: '170px'}}>
                          <Space>
                             Отчет
                          </Space>
                      </Button>
                  </Dropdown>
              </Form.Item>

              <Form.Item className='form-item-btn'>
                  <CreateAddModal></CreateAddModal>
              </Form.Item>
          </Form>
          </div>
          {selectedTable === 'table1' && <TableValuesByDate params={{ dateEnd: date[1], dateStart: date[0] }} />}
          {selectedTable === 'table2' && <TableValuesByDateAndLogin params={{ dateEnd: date[1], dateStart: date[0], userLogin: user }} />}
          {selectedTable === 'table3' && <TableValuesByDateAndStreet params={{ addressId: selectedKeyAddress, dateEnd: date[1], dateStart: date[0] }} />}
          {selectedTable === 'table4' && <TableTsjXlsx/>}
          {selectedTable === 'table5' && <TableUserInfoByTsj params={{tsjId: selectedKey}}/>}
          {selectedTable === 'table6' && <TableUserInfoByFlatId params={{addressId: selectedKeyAddress, flatId: selectedFlatKey }}/>}
          {selectedTable === 'table7' && <TableAllRenterAndFlats/>}
      </>
    )}



export default Admin;