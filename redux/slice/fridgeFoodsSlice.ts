import { createSlice } from '@reduxjs/toolkit';
import { Food } from '../../constant/foodInfo';

export const initialState: { fridgeFoods: Food[] } = {
  fridgeFoods: [
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
      purchaseDate: '',
      expiredDate: '2022-12-20',
      favorite: false,
      space: '냉동실 안쪽',
      compartmentNum: '1번',
    },
  ],
};

const fridgeFoodsSlice = createSlice({
  name: 'fridgeFoods',
  initialState,
  reducers: {
    setAllFridgeFoods: (state, action: { payload: Food[] }) => {
      state.fridgeFoods = action.payload;
    },
    addFridgeFood: (state, action: { payload: Food }) => {
      state.fridgeFoods = [...state.fridgeFoods, action.payload];
    },
    removeFridgeFood: (state, action: { payload: { id: string } }) => {
      state.fridgeFoods = state.fridgeFoods.filter(
        (food) => food.id !== action.payload.id
      );
    },
    editFridgeFood: (
      state,
      action: { payload: { foodId: string; editedFood: Food } }
    ) => {
      state.fridgeFoods = state.fridgeFoods.map((food) => {
        const { foodId, editedFood } = action.payload;
        return food.id === foodId ? editedFood : food;
      });
    },
  },
});

const { reducer: fridgeFoodsReducer } = fridgeFoodsSlice;

export const {
  setAllFridgeFoods,
  addFridgeFood,
  removeFridgeFood,
  editFridgeFood,
} = fridgeFoodsSlice.actions;

export default fridgeFoodsReducer;
