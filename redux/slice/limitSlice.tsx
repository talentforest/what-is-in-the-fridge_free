import { createSlice } from '@reduxjs/toolkit';

export const initialState: { limit: boolean } = {
  limit: true,
};

const limitSlice = createSlice({
  name: 'limit',
  initialState,
  reducers: {
    changeNoLimit: (state) => {
      state.limit = false;
    },
    makeLimit: (state) => {
      state.limit = true;
    },
  },
});

const { reducer: limitReducer } = limitSlice;

export const { changeNoLimit, makeLimit } = limitSlice.actions;

export default limitReducer;
