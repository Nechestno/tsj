import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { ICredentials, ILoginStore } from '../types/credentials.types.ts';
import { API_AUTH } from '../constants/endpoints.ts';
import $api from '../api.ts';

const initialState: ILoginStore    = {
  isAuthenticated: false,
  loading: false,
  error: false,
};

export const submitCredentials = createAsyncThunk< undefined, ICredentials, {rejectValue : string} >(
  'auth/submitCredentials', // Action type string
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await $api.post(API_AUTH, credentials, {
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      });

      if (response.status === 401) {
        alert("Введен неправильный логин или пароль");
        return rejectWithValue('Unauthorized');
      }

      const token = response.headers['authorization'];
      if (token != null) {
        localStorage.setItem('jwtToken', token);
        return token;
      }
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
        setLoggedIn: (state) => {
          state.isAuthenticated = true;
        },
        setLoggedOut: (state) =>  {
          state.isAuthenticated = false;
        }
  },
  extraReducers : (builder) => {
    builder
      .addCase(submitCredentials.pending, (state) => {
          state.loading = true;
          state.error = null;
      })
      .addCase(submitCredentials.fulfilled, (state) => {
          state.loading = false;
          state.error = null;
          state.isAuthenticated = true;
      })
      .addCase(submitCredentials.rejected, (state, action) => {
        state.error = action.payload || 'Unknown Error';
      })

  }
})


export const {setLoggedIn, setLoggedOut} = authSlice.actions;
export default authSlice.reducer;