import { createSlice } from '@reduxjs/toolkit';
import { deduplicate } from '../../util/deduplicate';
import { Food } from '../../constant/foods';

export const initialState: { shoppingList: Food[] } = {
  shoppingList: [],
};

const shoppingListSlice = createSlice({
  name: 'shoppingList',
  initialState,
  reducers: {
    addToShoppingList: (state, action: { payload: Food }) => {
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
