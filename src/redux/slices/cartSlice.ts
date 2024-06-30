// cartSlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {dishType} from '../../../utils/types';

export interface Dish {
  product: dishType;
  quantity: number;
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
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  orderNotes?: string;
}

const initialState: OrderState = {
  totalPrice: 1,
  customer: 'naveen',
  dishes: [],
  shippingAddress: {
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  },
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
      state.dishes.push(action.payload);
    },
    removeDish(state, action: PayloadAction<string>) {
      state.dishes = state.dishes.filter((_, ind) => ind != action.payload);
    },
    updateDish(state, action: PayloadAction<Dish>) {
      const index = state.dishes.findIndex(
        dish => dish.dishId === action.payload.dishId,
      );
      if (index !== -1) {
        state.dishes[index] = action.payload;
      }
    },
    setShippingAddress(state, action: PayloadAction<ShippingAddress>) {
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
} = cartSlice.actions;

export default cartSlice.reducer;
