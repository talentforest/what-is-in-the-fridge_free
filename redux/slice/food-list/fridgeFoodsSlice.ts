import { createSlice } from '@reduxjs/toolkit';
import { Food, exampleFridgeFoods } from '../../../constant/foodInfo';

export const initialState: { fridgeFoods: Food[] } = {
  fridgeFoods: exampleFridgeFoods,
};

const fridgeFoodsSlice = createSlice({
  name: 'fridgeFoods',
  initialState,
  reducers: {
    setAllFridgeFoods: (state, action: { payload: Food[] }) => {
      state.fridgeFoods = action.payload;
    },
    addFridgeFoods: (state, action: { payload: Food[] }) => {
      state.fridgeFoods = [...state.fridgeFoods, ...action.payload];
    },
    addFridgeFood: (state, action: { payload: Food }) => {
      state.fridgeFoods = [...state.fridgeFoods, action.payload];
    },
    removeFridgeFood: (state, action: { payload: string }) => {
      state.fridgeFoods = state.fridgeFoods.filter(
        (food) => food.id !== action.payload
      );
    },
    editFridgeFood: (
      state,
      action: { payload: { id: string; food: Food } }
    ) => {
      state.fridgeFoods = state.fridgeFoods.map((fridgeFood) => {
        const { id, food } = action.payload;
        return fridgeFood.id === id ? food : fridgeFood;
      });
    },
  },
});

const { reducer: fridgeFoodsReducer } = fridgeFoodsSlice;

export const {
  setAllFridgeFoods,
  addFridgeFood,
  addFridgeFoods,
  removeFridgeFood,
  editFridgeFood,
} = fridgeFoodsSlice.actions;

export default fridgeFoodsReducer;
