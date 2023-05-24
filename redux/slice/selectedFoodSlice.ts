import { createSlice } from '@reduxjs/toolkit';
import { Food, initialFoodInfo } from '../../constant/foods';

export const initialState: { selectedFood: Food } = {
  selectedFood: initialFoodInfo,
};

const selectedFoodSlice = createSlice({
  name: 'selectedFood',
  initialState,
  reducers: {
    select: (state, action: { payload: Food }) => {
      state.selectedFood = action.payload;
    },
  },
});

const { reducer: selectedFoodReducer } = selectedFoodSlice;

export const { select } = selectedFoodSlice.actions;

export default selectedFoodReducer;
