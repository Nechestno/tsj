import { Select } from 'antd';
import  { useEffect, useState } from 'react';
import { API_FLAT_GET_ALL } from '../../constants/endpoints.ts';
import $api from '../../api.ts';
import { Props } from '../../types/data.types.ts'


const SelectFlat = ( {onChange}: Props ) =>{

  const [flatData, setFlatData] = useState([])

  useEffect(() => {
    $api.get(API_FLAT_GET_ALL,{}
    )
      .then(async result => {
        return setFlatData(await result.data);
      });
  },[])

  return(
    <Select onChange={onChange}>
    {flatData.map((item: any) => (
      <Select.Option key = {item.id} value={item.name}>
        {item.number}
      </Select.Option>
    ))}
  </Select>
  )
}
export default SelectFlat;