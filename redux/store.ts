import { configureStore } from '@reduxjs/toolkit';
import fridgeFoodsReducer from './slice/allFoodsSlice';
import favoriteFoodsReducer from './slice/favoriteFoodsSlice';

export const store = configureStore({
  reducer: {
    allFoods: fridgeFoodsReducer,
    favoriteFoods: favoriteFoodsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
