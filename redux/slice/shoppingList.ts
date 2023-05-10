import { createSlice } from '@reduxjs/toolkit';
import { deduplicate } from '../../util/deduplicate';

export interface FoodToBuy {
  name: string;
}

export const initialState: { shoppingList: FoodToBuy[] } = {
  shoppingList: [],
};

const shoppingListSlice = createSlice({
  name: 'shoppingList',
  initialState,
  reducers: {
    addToShoppingList: (state, action: { payload: FoodToBuy }) => {
      state.shoppingList = deduplicate([...state.shoppingList, action.payload]);
    },
    removeFromShoppingList: (state, action: { payload: { name: string } }) => {
      state.shoppingList = state.shoppingList.filter(
        (item) => item.name !== action.payload.name
      );
    },
  },
});

const { reducer: shoppingListReducer } = shoppingListSlice;

export const { addToShoppingList, removeFromShoppingList } =
  shoppingListSlice.actions;

export default shoppingListReducer;
