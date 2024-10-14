import React from 'react';
import { Button, Flex, Layout } from 'antd';
import './index.css'
import { useLoginStore } from '../../pages/Login/store.ts';
import { useNavigate } from 'react-router-dom';

interface IHeaderComponent {
  header: React.ReactNode;
}


const HeaderComponent: React.FC<IHeaderComponent> = ({ header }) => {
  const { Header } = Layout;
  const isAuthenticated = useLoginStore(state => state.isAuthenticated);
  const logout = useLoginStore(state => state.logout)
  const navigate = useNavigate();

  const onChangeButton = () => {
    logout(navigate);
  }


  return (
    <Header className="header-container">
        <div>{header}</div>
      {isAuthenticated ? <div className='exit-button'>
        <Flex justify='flex-end' align='center'><Button onClick={onChangeButton}>Выйти</Button></Flex>
      </div> : <div></div>}
    </Header>
  )
};

export default HeaderComponent;