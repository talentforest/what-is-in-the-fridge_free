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
      expiredDate: getFormattedDate(new Date(), 'YYYY-MM-DD'),
      space: '팬트리',
      quantity: '',
      memo: '',
    },
    {
      id: 'pantryFood_2',
      name: '삼계탕',
      category: '국·반찬류',
      purchaseDate: '2023-04-02',
      expiredDate: getFormattedDate(new Date(), 'YYYY-MM-DD'),
      space: '팬트리',
      quantity: '2',
      memo: '',
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
    addPantryFoods: (state, action: { payload: Food[] }) => {
      state.pantryFoods = deduplicate([
        ...state.pantryFoods,
        ...action.payload,
      ]);
    },
    addToPantry: (state, action: { payload: Food }) => {
      if ('compartmentNum' in action.payload) {
        const { compartmentNum, ...newFood } = action.payload;
        state.pantryFoods = deduplicate([...state.pantryFoods, newFood]);
      } else {
        state.pantryFoods = deduplicate([...state.pantryFoods, action.payload]);
      }
    },
    removePantryFood: (state, action: { payload: { id: string } }) => {
      state.pantryFoods = state.pantryFoods.filter(
        (item) => item.id !== action.payload.id
      );
    },
    editPantryFood: (
      state,
      action: { payload: { foodId: string; editedFood: Food } }
    ) => {
      const { foodId, editedFood } = action.payload;

      if ('compartmentNum' in editedFood) {
        const { compartmentNum, ...newEditedFood } = editedFood;

        state.pantryFoods = state.pantryFoods.map((food) =>
          food.id === foodId ? newEditedFood : food
        );
      } else {
        state.pantryFoods = state.pantryFoods.map((food) =>
          food.id === foodId ? editedFood : food
        );
      }
    },
  },
});

const { reducer: pantryFoodsReducer } = pantryFoodsSlice;

export const {
  setPantry,
  addToPantry,
  addPantryFoods,
  removePantryFood, //
  editPantryFood,
} = pantryFoodsSlice.actions;

export default pantryFoodsReducer;
