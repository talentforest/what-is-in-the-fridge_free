import { createSlice } from '@reduxjs/toolkit';
import { Food } from '../../constant/foods';

export const initialState: { fridgeFoods: Food[]; freezerFoods: Food[] } = {
  fridgeFoods: [
    {
      id: 'fridge1',
      image: '🍎',
      name: '사과',
      category: '채소, 과일',
      quantity: '3',
      purchaseDate: '2020-12-31',
      expirationDate: '2020-12-20',
      favorite: false,
      space: '냉장실 안쪽',
      compartmentNum: '1번',
    },
  ],
  freezerFoods: [
    {
      id: 'freezer1',
      image: '🍞',
      name: '사과',
      category: '채소, 과일',
      quantity: '3',
      purchaseDate: '2022-12-20',
      expirationDate: '2022-12-20',
      favorite: false,
      space: '냉동실 안쪽',
      compartmentNum: '1번',
    },
  ],
};

const foodListSlice = createSlice({
  name: 'foodList',
  initialState,
  reducers: {
    changeFridge: (state, action) => {
      state.fridgeFoods = action.payload;
    },
    changeFreezer: (state, action) => {
      state.freezerFoods = action.payload;
    },
  },
});

const { reducer: foodsListReducer } = foodListSlice;

export const { changeFridge, changeFreezer } = foodListSlice.actions;

export default foodsListReducer;
