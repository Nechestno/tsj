import React from 'react';
import { Button, Flex, Layout } from 'antd';
import './index.css'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks.ts';
import { setLoggedOut } from '../../store/authSlice.ts';

interface IHeaderComponent {
  header: React.ReactNode;
}


const HeaderComponent: React.FC<IHeaderComponent> = ({ header }) => {
  const { Header } = Layout;
  const isAuthenticated = useAppSelector(state => state.persistedReducer.auth.isAuthenticated);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onChangeButton = () => {
    dispatch(setLoggedOut());
    navigate('/')
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