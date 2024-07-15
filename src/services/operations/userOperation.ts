import {createAsyncThunk} from '@reduxjs/toolkit';
import {BaseUrl, updateUserApi} from '../endPoints';
import axios from 'axios';

export const editUser = createAsyncThunk(
  'user/editUser',
  async (data, {rejectWithValue}) => {
    try {
      const dat = data.data;
      const response = await axios.patch(updateUserApi(data?.userId), dat, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
