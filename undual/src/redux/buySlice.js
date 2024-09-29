// src/redux/buySlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isBuying: false,
  product: null,
};

const buySlice = createSlice({
  name: 'buy',
  initialState,
  reducers: {
    initiateBuy(state, action) {
      state.isBuying = true;
      state.product = action.payload;
    },
    completeBuy(state) {
      state.isBuying = false;
      state.product = null; // Reset product after purchase
    },
    cancelBuy(state) {
      state.isBuying = false;
      state.product = null; // Reset product if canceled
    },
  },
});

export const { initiateBuy, completeBuy, cancelBuy } = buySlice.actions;

export default buySlice.reducer;
