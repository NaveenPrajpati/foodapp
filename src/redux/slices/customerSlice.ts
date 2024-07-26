import {createSlice} from '@reduxjs/toolkit';
import {loginUser} from '../../services/operations/authOperations';
import {editUser} from '../../services/operations/userOperation';
import {showToast} from '../../utils/utilityFunctions';
import {fetchOrders} from '../../services/operations/dishOperations';
const initialState = {
  isLogin: false,
  userData: {},
  token: '',
  deliveryAddress: '',
  status: '',
  error: null,
  isDarkMode: false,
  hasSeenOnboarding: false,
  allOrders: [],
};

const customerSlice = createSlice({
  name: 'customerSlice',
  initialState,
  reducers: {
    setLogin(state, action) {
      state.isLogin = action.payload;
    },
    setUserData(state, action) {
      state.userData = action.payload;
    },
    setDeliveryAdd(state, action) {
      state.deliveryAddress = action.payload;
    },
    setIsDarkMode(state) {
      state.isDarkMode = !state.isDarkMode;
    },
    logout(state) {
      return {...initialState};
    },
    setOnBoardingStatus(state, action) {
      state.hasSeenOnboarding = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginUser.pending, state => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userData = action.payload.customer;
        state.token = action.payload.token;
        state.isLogin = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        // state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(editUser.pending, state => {
        state.status = 'loading';
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userData = action.payload.data;
        showToast('success', action.payload.message);
      })
      .addCase(editUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        showToast('success', action.payload.error);
      })
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
        showToast('success', action.payload.error);
      });
  },
});

export const {
  setLogin,
  setUserData,
  setDeliveryAdd,
  logout,
  setIsDarkMode,
  setOnBoardingStatus,
} = customerSlice.actions;
export default customerSlice.reducer;
