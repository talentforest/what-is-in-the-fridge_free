import { createSlice } from '@reduxjs/toolkit';
import { deduplicate } from '../../util/deduplicate';
import { getFormattedDate } from '../../util';
import { Food } from '../../constant/foodInfo';

export const initialState: { pantryFoods: Food[] } = {
  pantryFoods: [
    {
      id: 'pantryFood_1',
      name: '소면',
      category: '간편·즉석식품류',
      purchaseDate: '',
      expiredDate: getFormattedDate(new Date()),
      space: '팬트리',
    },
    {
      id: 'pantryFood_2',
      name: '삼계탕',
      category: '국·반찬류',
      purchaseDate: '2023-04-02',
      expiredDate: getFormattedDate(new Date()),
      space: '팬트리',
    },
  ],
};

const pantryFoodsSlice = createSlice({
  name: 'pantryFoods',
  initialState,
  reducers: {
    setPantry: (state, action: { payload: Food[] }) => {
      state.pantryFoods = deduplicate([...action.payload]);
    },
    addToPantry: (state, action: { payload: Food }) => {
      state.pantryFoods = deduplicate([...state.pantryFoods, action.payload]);
    },
    removeFromPantry: (state, action: { payload: { name: string } }) => {
      state.pantryFoods = state.pantryFoods.filter(
        (item) => item.name !== action.payload.name
      );
    },
    editPantryFood: (
      state,
      action: { payload: { foodId: string; editedFood: Food } }
    ) => {
      state.pantryFoods = state.pantryFoods.map((food) => {
        const { foodId, editedFood } = action.payload;
        return food.id === foodId ? editedFood : food;
      });
    },
  },
});

const { reducer: pantryFoodsReducer } = pantryFoodsSlice;

export const {
  setPantry,
  addToPantry,
  removeFromPantry, //
  editPantryFood,
} = pantryFoodsSlice.actions;

export default pantryFoodsReducer;
