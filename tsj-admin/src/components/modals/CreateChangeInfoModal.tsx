import React, { useState } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import $api from '../../api.ts';
import { API_PUT_VALUE } from '../../constants/routes.ts';


interface CreateChangeInfoModalProps {
  props: any;
}

const CreateChangeInfoModal: React.FC<CreateChangeInfoModalProps> = ({props}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState(props.valueHistory.value);
  const values = { ...props }
  const handleFormSubmit = () => {
    $api.put(API_PUT_VALUE, { ...values.valueHistory, value: inputValue })
      .then(async result => console.log(result.data))
      .catch(error => {
        console.error(error);
      });
    setIsModalOpen(false);
  }

  const showModal = () => {
    setIsModalOpen(true);
    console.log(props)
  };


  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="link" onClick={showModal}>
        Изменить
      </Button>

      <Modal title={props.serialNumber}  open={isModalOpen} footer='' onCancel={handleCancel}>
        <Form  variant="filled" onFinish={handleFormSubmit} style={{ maxWidth: 600 }}>
          <Form.Item label="Предыдущее показание" name="Input" initialValue={props.valueHistory.value}>
            <Input/>
          </Form.Item>

          <Form.Item
            label="Текущее показание"
            name="InputNumber"

          >
            <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)}>
            </Input>
          </Form.Item>
          <Form.Item
              name="InputNumber"
            >
            <div style={{display:'flex',flexDirection:'row',justifyContent:'flex-end'}}>
              <Button style={{marginRight:'10px'}} type='primary' htmlType='submit'>Изменить</Button>
              <Button onClick={handleCancel}>Закрыть</Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateChangeInfoModal;