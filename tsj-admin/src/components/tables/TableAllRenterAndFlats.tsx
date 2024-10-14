import { useEffect, useState } from 'react';
import { API_GET_ALL_RENTERS } from '../../constants/routes.ts';
import { Table } from 'antd';
import $api from '../../api.ts';


const TableAllRentersAndFlats= () => {
  const [tableData, setTableData] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
      $api.get(API_GET_ALL_RENTERS)
        .then(async result => {
          const data = result.data || [];
          const columns = [
            { title: 'Имя', dataIndex: 'firstName' },
            { title: 'Фамилия', dataIndex: 'lastName' },
            { title: 'Город', dataIndex: 'city' },
            { title: 'Улица', dataIndex: 'street' },
            { title: 'Дом', dataIndex: 'houseNumber' },
            { title: 'Номер телефона', dataIndex: 'phoneNumber' },
          ];
          setColumns(columns);
          setTableData(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    , [])


  return (
    <Table columns={columns} dataSource={tableData}> </Table>
  )
}

export default TableAllRentersAndFlats;