// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productsSlice';
import categoriesReducer from './categoriesSlice';

const store = configureStore({
  reducer: {
    products: productsReducer,
    categories: categoriesReducer,
  },
});

export default store;
