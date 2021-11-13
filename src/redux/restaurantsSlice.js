/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import API from '../api/api';

export const getRestaurants = createAsyncThunk(
  'restaurants/getRestaurants',
  async (token) => {
    const response = await fetch(`${API}/restaurants`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error(response.statusText);
    const data = await response.json();
    return data;
  },
);

export const restaurantsSlice = createSlice({
  name: 'restaurants',
  initialState: {
    loading: false,
    error: null,
    data: null,
  },
  extraReducers: {
    [getRestaurants.pending]: (state) => {
      state.loading = true;
    },
    [getRestaurants.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [getRestaurants.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
  },

});

export default restaurantsSlice.reducer;

export const selectAllRestaurants = (state) => state.restaurants;
