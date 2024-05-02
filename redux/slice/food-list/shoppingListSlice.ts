import { createSlice } from '@reduxjs/toolkit';
import { deduplicateByName } from '../../../util';
import { Food } from '../../../constant/foodInfo';

export const initialState: { shoppingList: Food[] } = {
  shoppingList: [],
};

const shoppingListSlice = createSlice({
  name: 'shoppingList',
  initialState,
  reducers: {
    setShoppingList: (state, action: { payload: Food[] }) => {
      state.shoppingList = deduplicateByName([...action.payload]);
    },
    addItemsToShoppingList: (state, action: { payload: Food[] }) => {
      state.shoppingList = deduplicateByName([
        ...state.shoppingList,
        ...action.payload,
      ]);
    },
    addToShoppingList: (state, action: { payload: Food }) => {
      state.shoppingList = deduplicateByName([
        ...state.shoppingList,
        action.payload,
      ]);
    },
    removeFromShoppingList: (state, action: { payload: { name: string } }) => {
      state.shoppingList = state.shoppingList.filter(
        (item) => item.name !== action.payload.name
      );
    },
    removeShoppingListFoods: (state, action: { payload: Food[] }) => {
      const filteredShoppingListFood = state.shoppingList.filter(
        (food) => !action.payload.some((newFood) => newFood.name === food.name)
      );
      state.shoppingList = filteredShoppingListFood;
    },
  },
});

const { reducer: shoppingListReducer } = shoppingListSlice;

export const {
  setShoppingList,
  addItemsToShoppingList,
  addToShoppingList,
  removeFromShoppingList,
  removeShoppingListFoods,
} = shoppingListSlice.actions;

export default shoppingListReducer;
