import { Select } from 'antd';
import  { useEffect, useState } from 'react';
import {  API_TSJ_GET_ALL } from '../../constants/endpoints.ts';
import $api from '../../api.ts';
import { Props } from '../../types/data.types.ts'


const SelectTsj = ( { onChange }: Props ) =>{
  const [tsjData, setTsjData] = useState([])
  useEffect(() => {
    $api.get(
      API_TSJ_GET_ALL, {}
    ).then(async result => {
      return setTsjData(await result.data)
    });
  },[])
  return(
  <Select onChange={( onChange )}>
    {tsjData.map((item : any) => (
      <Select.Option key = {item.id} value={item.name}>
          {item.name}
      </Select.Option>
    ))}
  </Select>
  )

}

export default SelectTsj;