import { createSlice } from '@reduxjs/toolkit';
import { deduplicate } from '../../../util';
import { Food, examplePantryFoods } from '../../../constant/foodInfo';

export const initialState: { pantryFoods: Food[] } = {
  pantryFoods: examplePantryFoods,
};

const pantryFoodsSlice = createSlice({
  name: 'pantryFoods',
  initialState,
  reducers: {
    setAllPantryFoods: (state, action: { payload: Food[] }) => {
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
    removePantryFood: (state, action: { payload: string }) => {
      state.pantryFoods = state.pantryFoods.filter(
        (item) => item.id !== action.payload
      );
    },
    editPantryFood: (
      state,
      action: { payload: { id: string; food: Food } }
    ) => {
      const { id, food } = action.payload;

      if ('compartmentNum' in food) {
        const { compartmentNum, ...newEditedFood } = food;
        state.pantryFoods = state.pantryFoods.map((pantryFood) =>
          pantryFood.id === id ? newEditedFood : pantryFood
        );
      } else {
        state.pantryFoods = state.pantryFoods.map((pantryFood) =>
          pantryFood.id === id ? food : pantryFood
        );
      }
    },
    handleQuantityPantryFood: (
      state,
      action: { payload: { id: string; quantity: string } }
    ) => {
      const { id, quantity } = action.payload;

      state.pantryFoods = state.pantryFoods.map((pantryFood) =>
        pantryFood.id === id ? { ...pantryFood, quantity } : pantryFood
      );
    },
  },
});

const { reducer: pantryFoodsReducer } = pantryFoodsSlice;

export const {
  setAllPantryFoods,
  addToPantry,
  addPantryFoods,
  removePantryFood,
  editPantryFood,
  handleQuantityPantryFood,
} = pantryFoodsSlice.actions;

export default pantryFoodsReducer;
