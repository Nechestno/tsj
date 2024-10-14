import React, { createContext, useState, useEffect, PropsWithChildren, FC } from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { useAuth } from '@/hooks/useAuth';


interface IContext {
    fetchData?: (endpoint: string) => Promise<any>;
    updateData?: (endpoint: string, data: any) => Promise<any>;
    patchData?: (endpoint: string, data: any) => Promise<any>;
    postData?: (endpoint: string, data: any, params: any) => Promise<any>;
    deleteData?: (endpoint: string, data: any, params: any) => Promise<any>;
}


export const BackendContext = createContext<IContext>({} as IContext);


const BackendProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [token, setToken] = useState('');
  const {authState} = useAuth();
  const TOKEN_KEY = 'my-jwt';

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await SecureStore.getItemAsync(TOKEN_KEY);
      console.log(storedToken);
      if (storedToken) {
        setToken(storedToken);
      }
    };

    fetchToken();
  }, []);

  console.log(token)

  const fetchData = async (endpoint: string) => {
    try {
      const response = await axios.get(endpoint, {
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  const updateData = async (endpoint: string, data: any) => {
    try {
      const response = await axios.put(endpoint, data, {
        headers: {
          'Content-Type': 'application/json',
          
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error updating data:', error);
      throw error;
    }
  };

  const postData = async (endpoint: string, data: any, params: any) => {
    try {
      const response = await axios.post(endpoint, data, {
        headers: {
          'Content-Type': 'application/json',
        },
        params: params
      });
      return response.data;
    } catch (error) {
      console.error('Error creating data:', error);
      throw error;
    }
  };

  const patchData = async (endpoint: string, data: any) => {
    try {
      const response = await axios.patch(endpoint,{}, {
        headers: {
          'Content-Type': 'application/json'
        },
        params: data
      });
      return response.data;
    } catch (error) {
      console.error('Error updating data:', error);
      throw error;
    }
  };

  const deleteData = async (endpoint: string, data: any) => {
    try {
      const response = await axios.patch(endpoint,{}, {
        headers: {
          'Content-Type': 'application/json'
        },
        params: data
      });
      return response.data;
    } catch (error) {
      console.error('Error updating data:', error);
      throw error;
    }
  };

  

  const value = {
    fetchData,
    updateData,
    postData,
    patchData,
    deleteData
  };

  return (
    <BackendContext.Provider value={value}>
      {children}
    </BackendContext.Provider>
  );
};

export default BackendProvider;