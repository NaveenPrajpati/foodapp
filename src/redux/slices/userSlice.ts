import {createSlice} from '@reduxjs/toolkit';
import {loginUser} from '../../services/operations/authOperations';
const initialState = {
  isLogin: false,
  userData: {},
  token: '',
  deliveryAddress: '',
  status: '',
  error: null,
};

const userSlice = createSlice({
  name: 'userSlice',
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
    logout(state) {
      state.isLogin = false;
      state.userData = {};
      state.token = '';
      state.deliveryAddress = '';
      state.status = '';
      state.error = null;
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
      });
  },
});

export const {setLogin, setUserData, setDeliveryAdd, logout} =
  userSlice.actions;
export default userSlice.reducer;
