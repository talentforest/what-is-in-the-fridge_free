import { configureStore } from '@reduxjs/toolkit';
import fridgeFoodsReducer from './slice/allFoodsSlice';
import favoriteFoodsReducer from './slice/favoriteFoodsSlice';
import shoppingListReducer from './slice/shoppingList';

export const store = configureStore({
  reducer: {
    allFoods: fridgeFoodsReducer,
    favoriteFoods: favoriteFoodsReducer,
    shoppingList: shoppingListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
