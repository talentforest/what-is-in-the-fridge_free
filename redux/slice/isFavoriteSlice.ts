import { createSlice } from '@reduxjs/toolkit';

export const initialState: { isFavorite: boolean } = {
  isFavorite: false,
};

const isFavoriteSlice = createSlice({
  name: 'isFavorite',
  initialState,
  reducers: {
    toggleFavorite: (state, action: { payload: boolean }) => {
      state.isFavorite = action.payload;
    },
  },
});

const { reducer: toggleFavoriteReducer } = isFavoriteSlice;

export const { toggleFavorite } = isFavoriteSlice.actions;

export default toggleFavoriteReducer;
