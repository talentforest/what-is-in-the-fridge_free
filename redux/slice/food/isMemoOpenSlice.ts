import { createSlice } from '@reduxjs/toolkit';

export const initialState: { isMemoOpen: boolean } = {
  isMemoOpen: false,
};

const isMemoOpenSlice = createSlice({
  name: 'isMemoOpen',
  initialState,
  reducers: {
    toggleMemoOpen: (state, action: { payload: boolean }) => {
      state.isMemoOpen = action.payload;
    },
  },
});

const { reducer: toggleMemoReducer } = isMemoOpenSlice;

export const { toggleMemoOpen } = isMemoOpenSlice.actions;

export default toggleMemoReducer;
