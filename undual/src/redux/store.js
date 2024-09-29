// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productsSlice';
import categoriesReducer from './categoriesSlice';
import cartReducer from './cartSlice'; // Import the cart reducer
import buyReducer from './buySlice'; // Import the buy reducer

const store = configureStore({
  reducer: {
    products: productsReducer,
    categories: categoriesReducer,
    cart: cartReducer, // Add cart reducer to the store
    buy: buyReducer, // Add the buy reducer here

  },
});

export default store;
