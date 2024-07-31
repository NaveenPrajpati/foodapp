import {createSlice} from '@reduxjs/toolkit';
import {showToast} from '../../utils/utilityFunctions';
import {fetchOrders} from '../../services/operations/dishOperations';
const initialState = {
  status: '',
  error: null,
  allOrders: [],
};

const orderSlice = createSlice({
  name: 'orderSlice',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOrders.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.allOrders = action.payload.orders;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        showToast('error', action.payload.error);
      });
  },
});

export const {} = orderSlice.actions;
export default orderSlice.reducer;
