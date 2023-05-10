import { createSlice } from '@reduxjs/toolkit';
import { Food } from '../../constant/foods';
import { Space } from '../../constant/fridgeInfo';

export const initialState: { fridgeFoods: Food[]; freezerFoods: Food[] } = {
  fridgeFoods: [
    {
      id: 'fridge1',
      image: '🍎',
      name: '사과',
      category: '과일',
      purchaseDate: '2023-12-31',
      expirationDate: '2023-12-20',
      favorite: false,
      space: '냉장실 안쪽',
      compartmentNum: '1번',
    },
  ],
  freezerFoods: [
    {
      id: 'freezer1',
      image: '🍞',
      name: '식빵',
      category: '빵, 떡, 잼',
      purchaseDate: '2022-12-20',
      expirationDate: '2022-12-20',
      favorite: false,
      space: '냉동실 안쪽',
      compartmentNum: '1번',
    },
  ],
};

const allFoodsSlice = createSlice({
  name: 'allFoods',
  initialState,
  reducers: {
    addFood: (state, action: { payload: Food }) => {
      if (action.payload.space.includes('냉장')) {
        state.fridgeFoods = [...state.fridgeFoods, action.payload];
      }
      if (action.payload.space.includes('냉동')) {
        state.freezerFoods = [...state.freezerFoods, action.payload];
      }
    },
    removeFood: (state, action: { payload: { id: string; space: Space } }) => {
      if (action.payload.space.includes('냉장')) {
        state.fridgeFoods = state.fridgeFoods.filter(
          (food) => food.id !== action.payload.id
        );
      }
      if (action.payload.space.includes('냉동')) {
        state.freezerFoods = state.freezerFoods.filter(
          (food) => food.id !== action.payload.id
        );
      }
    },
    editFood: (
      state,
      action: { payload: { foodId: string; editedFood: Food } }
    ) => {
      if (action.payload.editedFood.space.includes('냉장')) {
        state.fridgeFoods = state.fridgeFoods.map((food) => {
          const { foodId, editedFood } = action.payload;
          return food.id === foodId ? editedFood : food;
        });
      }
      if (action.payload.editedFood.space.includes('냉동')) {
        state.freezerFoods = state.freezerFoods.map((food) => {
          const { foodId, editedFood } = action.payload;
          return food.id === foodId ? editedFood : food;
        });
      }
    },
  },
});

const { reducer: allFoodsReducer } = allFoodsSlice;

export const { addFood, removeFood, editFood } = allFoodsSlice.actions;

export default allFoodsReducer;
