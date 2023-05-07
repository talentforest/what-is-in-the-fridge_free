import { configureStore } from '@reduxjs/toolkit';
import fridgeFoodsReducer from './slice/foodsListSlice';

export const store = configureStore({
  reducer: {
    foodsList: fridgeFoodsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
