import { Select } from 'antd';
import  { useEffect, useState } from 'react';
import {  API_STREET_GET_ALL } from '../../constants/endpoints.ts';
import $api from '../../api.ts';
import { Props } from '../../types/data.types.ts'


const SelectStreet = ( {onChange}:Props ) =>{
  const [streetData, setStreetData] = useState([])
  useEffect(() => {
    $api.get(
      API_STREET_GET_ALL, {
      }
    )
      .then(async result => {
        setStreetData(await result.data);
      });
  },[])
  return(<Select onChange={onChange}>
    {streetData.map((item: any) => (
      <Select.Option key = {item.id} value={item.name}>
        {item.street + ',' + item.houseNumber}
      </Select.Option>
    ))}
  </Select>)

}

export default SelectStreet;