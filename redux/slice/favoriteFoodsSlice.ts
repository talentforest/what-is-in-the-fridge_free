import { createSlice } from '@reduxjs/toolkit';
import { Food } from '../../constant/foods';
import { deduplicate } from '../../util/deduplicate';

export const initialState: { favoriteFoods: Food[] } = {
  favoriteFoods: [],
};

const favoriteFoodsSlice = createSlice({
  name: 'favoriteFoods',
  initialState,
  reducers: {
    addFavorite: (state, action: { payload: Food }) => {
      state.favoriteFoods = deduplicate(
        [...state.favoriteFoods, action.payload],
        'name'
      );
    },
    removeFavorite: (state, action: { payload: { name: string } }) => {
      state.favoriteFoods = state.favoriteFoods.filter(
        (item) => item.name !== action.payload.name
      );
    },
  },
});

const { reducer: favoriteFoodsReducer } = favoriteFoodsSlice;

export const { addFavorite, removeFavorite } = favoriteFoodsSlice.actions;

export default favoriteFoodsReducer;
