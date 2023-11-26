import { createSlice } from '@reduxjs/toolkit';
import { Fonts } from '../../constant/fonts';

export const initialState: { fontFamily: Fonts } = {
  fontFamily: 'LocusSangsang',
};

const fontSlice = createSlice({
  name: 'fontFamily',
  initialState,
  reducers: {
    changeFont: (state, action: { payload: Fonts }) => {
      state.fontFamily = action.payload;
    },
  },
});

const { reducer: changeFontReducer } = fontSlice;

export const { changeFont } = fontSlice.actions;

export default changeFontReducer;
