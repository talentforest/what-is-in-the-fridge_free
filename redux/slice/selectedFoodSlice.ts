import { createSlice } from '@reduxjs/toolkit';
import { Food, initialFood } from '../../constant/foodInfo';

export const initialState: { selectedFood: Food } = {
  selectedFood: initialFood,
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
