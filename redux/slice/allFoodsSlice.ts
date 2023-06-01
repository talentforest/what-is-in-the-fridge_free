import { createSlice } from '@reduxjs/toolkit';
import { Food } from '../../constant/foods';
import { Space } from '../../constant/fridgeInfo';

export const initialState: { allFoods: Food[] } = {
  allFoods: [
    {
      id: 'fridge1',
      image: '🍎',
      name: '사과',
      category: '신선식품류',
      purchaseDate: '2023-12-31',
      expiredDate: '2023-12-20',
      favorite: false,
      space: '냉장실 안쪽',
      compartmentNum: '1번',
    },
    {
      id: 'freezer1',
      image: '🍞',
      name: '식빵',
      category: '신선식품류',
      purchaseDate: '2022-12-20',
      expiredDate: '2022-12-20',
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
    setAllFoods: (state, action: { payload: Food[] }) => {
      state.allFoods = action.payload;
    },
    addFood: (state, action: { payload: Food }) => {
      state.allFoods = [...state.allFoods, action.payload];
    },
    removeFood: (state, action: { payload: { id: string; space: Space } }) => {
      state.allFoods = state.allFoods.filter(
        (food) => food.id !== action.payload.id
      );
    },
    editFood: (
      state,
      action: { payload: { foodId: string; editedFood: Food } }
    ) => {
      state.allFoods = state.allFoods.map((food) => {
        const { foodId, editedFood } = action.payload;
        return food.id === foodId ? editedFood : food;
      });
    },
  },
});

const { reducer: allFoodsReducer } = allFoodsSlice;

export const { setAllFoods, addFood, removeFood, editFood } =
  allFoodsSlice.actions;

export default allFoodsReducer;
