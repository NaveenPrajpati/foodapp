import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {fetchDishes} from '../../services/operations/dishOperations';

export interface CounterState {
  value: number;
  areWeLive: boolean;
  allDishes: [];
  status: string;
  error: string | null;
  addDishStatus: string;
  addDishError: string | null;
  loading: string;
}

const initialState: CounterState = {
  value: 0,
  areWeLive: true,
  allDishes: [],
  status: 'idle', // idle | loading | succeeded | failed
  error: null,
  addDishStatus: 'idle',
  addDishError: null,
  loading: 'false',
};

export const dashboardSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
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
        // state.status = 'failed';
        state.error = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
export const {} = dashboardSlice.actions;

export default dashboardSlice.reducer;
