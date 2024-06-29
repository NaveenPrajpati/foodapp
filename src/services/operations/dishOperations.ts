import {createAsyncThunk} from '@reduxjs/toolkit';
import {BaseUrl} from '../endPoints';
import axios from 'axios';

export const fetchDishes = createAsyncThunk(
  'dishes/getAllDishes',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axios.get(BaseUrl + '/dishes/getDishes');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const addDish = createAsyncThunk(
  'dishes/addDish',
  async (data, {rejectWithValue}) => {
    try {
      const response = await axios.post(BaseUrl + '/dishes/add', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
