import { Button } from 'antd';
import $api from '../../api.ts';
import { API_DELETE_VALUE} from '../../constants/routes.ts';


const DeleteButton  = ({props}) => {
  const deleteSubmit = () => {
    $api.delete(API_DELETE_VALUE, { params: {
      id: props.valueHistory.id
      }})
      .then(async result => console.log(result.data))
      .catch(error => {
        console.error(error);
      });
  }

  return (
    <Button type='link' htmlType='submit' onClick={deleteSubmit}>Удалить</Button>
  )
}

export default DeleteButton