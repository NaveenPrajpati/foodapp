import {createAsyncThunk} from '@reduxjs/toolkit';
import {BaseUrl} from '../endPoints';
import axios from 'axios';

export const fetchDishes = createAsyncThunk(
  'dishes/getAllDishes',
  async ({}, {rejectWithValue}) => {
    try {
      console.log('hitting ');
      const response = await axios.get(BaseUrl + '/customer/getDishesCustomer');
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

// export const addDish = createAsyncThunk(
//   'dishes/addDish',
//   async (data, {rejectWithValue}) => {
//     try {
//       const response = await axios.post(BaseUrl + '/dishes/add', data, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   },
// );
