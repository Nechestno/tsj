  import React, { useState } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import $api from '../../api.ts';
import { API_POST_VALUE } from '../../constants/routes.ts';


const CreateAddModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState('');
  const [meterId, setMeterId] = useState('');

  const json = JSON.stringify({
    value: value,
    date: new Date().getTime(),
    meter:{
      id: meterId,
    }});
  const handleFormSubmit = () => {
    $api.post(API_POST_VALUE, json, {
      headers: {
        'Content-Type': 'application/json'
      }
      }
     )
      .then(async result => console.log(result.data))
      .catch(error => {
        console.error(error);
      });
    setIsModalOpen(false);
  }

  const showModal = () => {
    setIsModalOpen(true);
  };


  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Добавить показание
      </Button>

      <Modal title='Добавить показание'  open={isModalOpen} footer='' onCancel={handleCancel}>
        <Form  variant="filled" onFinish={handleFormSubmit} style={{ maxWidth: 600 }}>
          <Form.Item label="Показание" name="Input" >
            <Input onChange={e => setValue(e.target.value)}/>
          </Form.Item>

          <Form.Item
            label="Id Счетчика"
            name="InputNumber"
          >
            <Input onChange={e => setMeterId(e.target.value)}>
            </Input>
          </Form.Item>
          <Form.Item>
            <div style={{display:'flex',flexDirection:'row',justifyContent:'flex-end'}}>
              <Button style={{marginRight:'10px'}} type='primary' htmlType='submit'>Добавить</Button>
              <Button onClick={handleCancel}>Закрыть</Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateAddModal;