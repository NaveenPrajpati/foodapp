import {createAsyncThunk} from '@reduxjs/toolkit';
import {BaseUrl, GetAllOrdersApi, updataOrderApi} from '../endPoints';
import axios from 'axios';

export const fetchOrders = createAsyncThunk(
  'orders/getAllOrders',
  async (data, {rejectWithValue}) => {
    try {
      const response = await axios.get(GetAllOrdersApi, {
        params: {
          role: 'customer',
          id: data.id,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const updateOrder = createAsyncThunk(
  'orders/updateOrder',
  async (data, {rejectWithValue}) => {
    try {
      const response = await axios.patch(updataOrderApi(data.id), data.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
