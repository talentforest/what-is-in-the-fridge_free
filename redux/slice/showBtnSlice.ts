import { createSlice } from '@reduxjs/toolkit';

export const initialState: { showBtn: boolean } = {
  showBtn: false,
};

const showBtnSlice = createSlice({
  name: 'showBtn',
  initialState,
  reducers: {
    toggleShowBtn: (state, action: { payload: boolean }) => {
      state.showBtn = action.payload;
    },
  },
});

const { reducer: toggleShowBtnReducer } = showBtnSlice;

export const { toggleShowBtn } = showBtnSlice.actions;

export default toggleShowBtnReducer;
