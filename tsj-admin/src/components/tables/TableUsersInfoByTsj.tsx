import { useEffect, useState } from 'react';
import { API_GET_ALL_USER_INFO_BY_TSJ_ID } from '../../constants/endpoints.ts';
import { Table } from 'antd';
import $api from '../../api.ts';


const TableUserInfoByTsj= ({ params }) => {
  const [tableData, setTableData] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
      $api.get(API_GET_ALL_USER_INFO_BY_TSJ_ID, {
        params: {
          tsjId: params.tsjId,
        }
      })
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
    , [params.tsjId])


  return (
    <Table columns={columns} dataSource={tableData}> </Table>
  )
}

export default TableUserInfoByTsj;