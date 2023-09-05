import { createSlice } from '@reduxjs/toolkit';
import { CompartmentNum } from '../../constant/fridgeInfo';

export type CompartmentNumToDrop = CompartmentNum | '동일칸';

export const initialState: { compartmentNumToDrop: CompartmentNumToDrop } = {
  compartmentNumToDrop: '동일칸',
};

const compartmentNumToDropSlice = createSlice({
  name: 'compartmentNumToDrop',
  initialState,
  reducers: {
    changeCompartmentNum: (
      state,
      action: { payload: CompartmentNumToDrop }
    ) => {
      state.compartmentNumToDrop = action.payload;
    },
  },
});

const { reducer: changeCompartmentNumReducer } = compartmentNumToDropSlice;

export const { changeCompartmentNum } = compartmentNumToDropSlice.actions;

export default changeCompartmentNumReducer;
