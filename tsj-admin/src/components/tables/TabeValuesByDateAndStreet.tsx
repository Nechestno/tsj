import  { useEffect, useState } from 'react';
import {
  API_GET_ALL_VALUE_HISTORY_BY_DATE_AND_STREET,
} from '../../constants/endpoints.ts';
import { Table } from 'antd';
import $api from '../../api.ts';
import CreateChangeInfoModal from '../modals/CreateChangeInfoModal.tsx';
import DeleteButton from '../buttons/DeleteButton.tsx';


const TableValuesByDateAndStreet = ({ params }) => {
  const [tableData, setTableData] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
      $api.get(API_GET_ALL_VALUE_HISTORY_BY_DATE_AND_STREET, {
        params: {
          addressId: params.addressId,
          dateEnd: params.dateEnd ? new Date(params.dateEnd).toISOString().replace('T', ' ').slice(0, -5) : null,
          dateStart: params.dateStart ? new Date(params.dateStart).toISOString().replace('T', ' ').slice(0, -5) : null,

        }
      })
        .then(async result => {
          const data = result.data || [];
          const columns = [
            { title: 'Имя', dataIndex: 'firstName' },
            { title: 'Фамилия', dataIndex: 'lastName' },
            { title: 'Дата', dataIndex: ['valueHistory', 'date'], render: (text) => new Date(text).toUTCString()},
            { title: 'Показание', dataIndex: ['valueHistory', 'value'] },
            {
              render: (_, record) => (
                <>
                  <CreateChangeInfoModal props = {record}></CreateChangeInfoModal>
                  <DeleteButton props={record}></DeleteButton>
                </>
              ),
            },
          ];
          setColumns(columns);
          setTableData(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    , [params.dateEnd, params.dateStart])


  return (
    <Table columns={columns} dataSource={tableData}></Table>
  )
}

export default TableValuesByDateAndStreet;