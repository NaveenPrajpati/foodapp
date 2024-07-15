import {createAsyncThunk} from '@reduxjs/toolkit';
import {BaseUrl} from '../endPoints';
import axios from 'axios';

export const fetchDishes = createAsyncThunk(
  'dishes/getAllDishes',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axios.get(BaseUrl + '/customer/getDishesCustomer');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
