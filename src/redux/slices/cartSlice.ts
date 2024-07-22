// cartSlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {dishType} from '../../utils/types';

export interface Dish {
  product: dishType;
  quantity: number;
  option: number;
}

export interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface OrderState {
  totalPrice: number;
  customer: string;
  dishes: Dish[];
  shippingAddress: string;
  paymentMethod: string;
  orderNotes?: string;
}

const initialState: OrderState = {
  totalPrice: 1,
  customer: '',
  dishes: [],
  shippingAddress: '',
  paymentMethod: '',
  orderNotes: '',
};

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    setTotalPrice(state, action: PayloadAction<number>) {
      state.totalPrice = action.payload;
    },
    setCustomer(state, action: PayloadAction<string>) {
      state.customer = action.payload;
    },
    addDish(state, action: PayloadAction<Dish>) {
      if (!state.dishes) {
        state.dishes = [];
      }
      state.dishes.map(item => {
        if (item.kichen != action.payload.product.kitchen) {
          state.dishes = [];
          state.dishes.push(action.payload);
        }
      });
      state.dishes.push(action.payload);
    },
    removeDish(state, action: PayloadAction<number>) {
      state.dishes = state.dishes.filter((_, ind) => ind != action.payload);
    },
    emptyCart(state, action: PayloadAction<any>) {
      state.dishes = [];
    },
    updateDish(state, action: PayloadAction<{index: number; dish: Dish}>) {
      state.dishes[action.payload.index] = action.payload.dish;
    },
    setShippingAddress(state, action: PayloadAction<string>) {
      state.shippingAddress = action.payload;
    },
    setPaymentMethod(state, action: PayloadAction<string>) {
      state.paymentMethod = action.payload;
    },
    setOrderNotes(state, action: PayloadAction<string>) {
      state.orderNotes = action.payload;
    },
  },
});

export const {
  setTotalPrice,
  setCustomer,
  addDish,
  removeDish,
  updateDish,
  setShippingAddress,
  setPaymentMethod,
  setOrderNotes,
  emptyCart,
} = cartSlice.actions;

export default cartSlice.reducer;
