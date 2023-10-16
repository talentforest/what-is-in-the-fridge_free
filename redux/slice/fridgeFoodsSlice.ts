import { createSlice } from '@reduxjs/toolkit';
import { Food } from '../../constant/foodInfo';

export const initialState: { fridgeFoods: Food[] } = {
  fridgeFoods: [
    {
      id: 'fridge1',
      name: '사과',
      category: '신선식품류',
      purchaseDate: '2023-10-31',
      expiredDate: '2023-12-20',
      space: '냉장실 안쪽',
      compartmentNum: '1번',
      quantity: '6',
      memo: '',
    },
    {
      id: 'freezer1',
      name: '식빵',
      category: '베이커리·잼',
      purchaseDate: '',
      expiredDate: '2022-12-20',
      space: '냉동실 안쪽',
      compartmentNum: '1번',
      quantity: '',
      memo: '',
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
    addFridgeFoods: (state, action: { payload: Food[] }) => {
      state.fridgeFoods = [...state.fridgeFoods, ...action.payload];
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
  addFridgeFoods,
  removeFridgeFood,
  editFridgeFood,
} = fridgeFoodsSlice.actions;

export default fridgeFoodsReducer;
