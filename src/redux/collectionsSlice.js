/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import API from '../api/api';

export const postCollections = createAsyncThunk(
  'collections/postCollections',
  async (
    {
      vegetarian_favorites, meat_lovers, user_id,
    },
  ) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API}/collections`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        vegetarian_favorites,
        meat_lovers,
        user_id,
      }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.failure);

    return data;
  },
);

export const getCollections = createAsyncThunk(
  'collections/getCollections',
  async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API}/collections`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error(response.statusText);
    const data = await response.json();
    return data;
  },
);

export const collectionsSlice = createSlice({
  name: 'collections',
  initialState: {
    loading: false,
    error: null,
    data: [],
  },
  extraReducers: {
    [postCollections.pending]: (state) => {
      state.loading = true;
    },
    [postCollections.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [postCollections.fulfilled]: (state, action) => {
      state.loading = false;
      state.data.push(action.payload);
    },
    [getCollections.pending]: (state) => {
      state.loading = true;
    },
    [getCollections.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [getCollections.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },

  },
});

export default collectionsSlice.reducer;
