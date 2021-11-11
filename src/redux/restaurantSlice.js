/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import API from '../api/api';

export const getRestaurant = createAsyncThunk(
  'restaurant/getRestaurant',
  async (id, token) => {
    const response = await fetch(`${API}/restaurants/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error(response.statusText);
    const data = await response.json();
    return data;
  },
);

export const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState: {
    loading: false,
    error: null,
    data: null,
  },
  extraReducers: {
    [getRestaurant.pending]: (state) => {
      state.loading = true;
    },
    [getRestaurant.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [getRestaurant.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
  },

});

export default restaurantSlice.reducer;
