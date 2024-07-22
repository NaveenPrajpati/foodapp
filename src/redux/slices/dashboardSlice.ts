import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {fetchKitchens} from '../../services/operations/dishOperations';

export interface CounterState {
  value: number;
  areWeLive: boolean;
  allDishes: [];
  allKitchens: [];
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
  allKitchens: [],
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
      .addCase(fetchKitchens.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchKitchens.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // console.log(JSON.stringify(action.payload));
        state.allKitchens = action.payload;
      })
      .addCase(fetchKitchens.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
export const {} = dashboardSlice.actions;

export default dashboardSlice.reducer;
