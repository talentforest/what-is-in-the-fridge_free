import { createSlice } from '@reduxjs/toolkit';
import { deduplicate } from '../../util/deduplicate';
import { PantryFood } from '../../constant/foodInfo';
import { getFormattedDate } from '../../util';

export const initialState: { pantryFoods: PantryFood[] } = {
  pantryFoods: [
    {
      id: 'pantryFood_1',
      image: '',
      name: '소면',
      category: '간편·즉석식품류',
      purchaseDate: '',
      expiredDate: getFormattedDate(new Date()),
      favorite: true,
      space: '펜트리',
    },
    {
      id: 'pantryFood_2',
      image: '',
      name: '삼계탕',
      category: '국·반찬류',
      purchaseDate: '2023-04-02',
      expiredDate: getFormattedDate(new Date()),
      favorite: false,
      space: '펜트리',
    },
  ],
};

const pantryFoodsSlice = createSlice({
  name: 'pantryFoods',
  initialState,
  reducers: {
    setPantry: (state, action: { payload: PantryFood[] }) => {
      state.pantryFoods = deduplicate([...action.payload]);
    },
    addToPantry: (state, action: { payload: PantryFood }) => {
      state.pantryFoods = deduplicate([...state.pantryFoods, action.payload]);
    },
    removeFromPantry: (state, action: { payload: { name: string } }) => {
      state.pantryFoods = state.pantryFoods.filter(
        (item) => item.name !== action.payload.name
      );
    },
    editPantryFood: (
      state,
      action: { payload: { foodId: string; editedFood: PantryFood } }
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
} = pantryFoodsSlice.actions;

export default pantryFoodsReducer;
