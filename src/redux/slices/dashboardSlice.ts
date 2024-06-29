import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {addDish, fetchDishes} from '../../services/operations/dishOperations';

export interface CounterState {
  value: number;
  areWeLive: boolean;
  allDishes: [];
  status: string;
  error: string | null;
  addDishStatus: string;
  addDishError: string | null;
}

const initialState: CounterState = {
  value: 0,
  areWeLive: true,
  allDishes: [],
  status: 'idle', // idle | loading | succeeded | failed
  error: null,
  addDishStatus: 'idle',
  addDishError: null,
};

const dashboardSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: state => {
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    setAreWeLive: (state, action: PayloadAction<boolean>) => {
      state.areWeLive = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchDishes.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchDishes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.allDishes = action.payload;
      })
      .addCase(fetchDishes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addDish.pending, state => {
        state.addDishStatus = 'loading';
      })
      .addCase(addDish.fulfilled, (state, action) => {
        state.addDishStatus = 'succeeded';
        state.allDishes.push(action.payload); // Optionally add the new dish to the list
      })
      .addCase(addDish.rejected, (state, action) => {
        state.addDishStatus = 'failed';
        state.addDishError = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
export const {increment, decrement, incrementByAmount} = dashboardSlice.actions;

export default dashboardSlice.reducer;
