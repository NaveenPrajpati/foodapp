import {createAsyncThunk} from '@reduxjs/toolkit';
import {BaseUrl} from '../endPoints';
import axios from 'axios';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (data, {rejectWithValue}) => {
    try {
      const response = await axios.post(BaseUrl + '/auth/loginCustomer', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (data, {rejectWithValue}) => {
    try {
      const response = await axios.post(
        BaseUrl + '/auth/registerCustomer',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
