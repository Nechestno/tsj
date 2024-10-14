import React from 'react';
import { Button, Checkbox, Form, Input, Typography, ConfigProvider } from 'antd';
import './index.css';
import { useLoginStore } from './store.ts';
import { useNavigate } from 'react-router-dom';


const Login: React.FC = () => {
  const { Title } = Typography;
  const { sendCredentials } = useLoginStore();
  const navigate = useNavigate();
  const onFinish = (values: any) => {
    const {login, password} = values;
    sendCredentials({ login,password}, navigate);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    alert("Введен неправильный логин или пароль")
  };
 
    return (
      
    <div className="center-form">
      <ConfigProvider theme={{
        token: {
          colorPrimary: '#ec1c24',
        }}}
      >

        <div className="shadow">
            <Form 
              layout='vertical'
              name="basic"
              labelCol={{ span: 8 }} 
              wrapperCol={{ span: 18 }}
              initialValues={{ remember: true }} 
              onFinish={onFinish}
              onFinishFailed={onFinishFailed} 
              autoComplete="off"
            >
                <Title className='form-title'>
                  Авторизация
                </Title>
              <div className="form-wrapper">
              <Form.Item 
                className='login-menu login-form-item'
                name="login"
                rules={[{ required: true, message: 'Пожалуйста введите логин!' }]}
              >
                <div className="shadow">
                  <Input placeholder='Введите логин' />
                </div>
              </Form.Item>
              <Form.Item 
                className='login-form-item'
                name="password" 
                rules={[{ required: true, message: 'Пожалуйста введите пароль!' }]}
              >
                <div className="shadow">
                  <Input.Password placeholder='Введите пароль' />
                </div>
              </Form.Item>
              <Form.Item
                className='login-form-item'
                name='forgot' 
                wrapperCol={{span:4, offset:8}}
              >
                <Button type="link" htmlType='button'>
                  Забыли пароль?
                </Button>
              </Form.Item>
              <Form.Item
                className='checkbox login-form-item-checkbox' 
                name="remember" 
                valuePropName="checked" 
                wrapperCol={{ span: 8, offset: 3 }}>
                <Checkbox>Запомнить меня</Checkbox>
              </Form.Item>
              <Form.Item
                className='login-form-item login-form-item-btn'
                wrapperCol={{ span: 18 }}>
                <Button block type="primary" htmlType="submit">
                  Войти
                </Button>
              </Form.Item>
              </div>
            </Form>
            </div>
      </ConfigProvider>
      </div>
      );
}
  

export default Login;
