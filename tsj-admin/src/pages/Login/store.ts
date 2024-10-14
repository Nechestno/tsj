import { create } from 'zustand';
import { devtools } from 'zustand/middleware'
import { submitCredentials } from './api';
import { ICredentials, ILoginStore } from '../../types/credentials.types';
import { NavigateFunction } from 'react-router-dom';

export const useLoginStore = create<ILoginStore>()(devtools((set) => ({
  token: localStorage.getItem('jwtToken'),
  isAuthenticated: false,
  loading: false,
  error: null,
  sendCredentials: async (credentials: ICredentials,navigate: NavigateFunction) => {
    try {
      await submitCredentials(credentials);
      const token = localStorage.getItem('jwtToken');
      if(token != null ){
        set({ token, isAuthenticated: true });
        navigate('/admin')}
      else {
        set({ isAuthenticated: false })
      }
    } catch (error : any ) {
      if (error.response && error.response.status === 401) {
        alert('Введен неправильный логин или пароль');
      } else {
        console.log(1)
      }
    }
  },
  logout: (navigate: NavigateFunction) => {
    localStorage.removeItem('jwtToken');
    set({ token: null, isAuthenticated: false });
    navigate('/')
  },
})));