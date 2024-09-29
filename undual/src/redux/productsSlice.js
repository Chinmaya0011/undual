import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ category, limit, skip, searchTerm }) => {
    let url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;

    if (category) {
      url = `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`;
    }

    if (searchTerm) {
      url += `&search=${searchTerm}`;
    }

    const response = await axios.get(url);
    return response.data.products;
  }
);

// Create a slice for products
const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    status: 'idle',
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;
