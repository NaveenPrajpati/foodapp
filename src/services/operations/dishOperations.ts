import {createAsyncThunk} from '@reduxjs/toolkit';
import {BaseUrl, GetAllOrdersApi} from '../endPoints';
import axios from 'axios';

export const fetchKitchens = createAsyncThunk(
  'kitchen/getAllKitchens',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axios.get(BaseUrl + '/customer/allKitchens');

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

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
