import { Select } from 'antd';
import  { useEffect, useState } from 'react';
import {  API_USER_GET_ALL } from '../../constants/endpoints.ts';
import $api from '../../api.ts';
import { Props } from '../../types/data.types.ts'

const SelectUsers = ( { onChange }: Props ) =>{
  const [userData, setUserData] = useState([])
  useEffect(() => {
    $api.get(
      API_USER_GET_ALL, {
      }
    ).then(async result => {
      return setUserData(await result.data)
    });
  },[])
  return(<Select onChange={( onChange )}>
    {userData.map((item: any) => (
      <Select.Option key = {item.id} value={item.login}>
        {item.login}
      </Select.Option>
    ))}
  </Select>)

}

export default SelectUsers;