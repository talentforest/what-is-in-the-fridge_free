import { createSlice } from '@reduxjs/toolkit';
import { Food } from '../../constant/foodInfo';
import { deduplicate } from '../../util/deduplicate';

export const initialState: { favoriteFoods: Food[] } = {
  favoriteFoods: [],
};

const favoriteFoodsSlice = createSlice({
  name: 'favoriteFoods',
  initialState,
  reducers: {
    setFavoriteList: (state, action: { payload: Food[] }) => {
      state.favoriteFoods = deduplicate(action.payload);
    },
    addFavorite: (state, action: { payload: Food }) => {
      state.favoriteFoods = deduplicate([
        ...state.favoriteFoods,
        action.payload,
      ]);
    },
    removeFavorite: (state, action: { payload: string }) => {
      state.favoriteFoods = state.favoriteFoods.filter(
        (item) => item.name !== action.payload
      );
    },
    editFavorite: (state, action: { payload: Food }) => {
      state.favoriteFoods = state.favoriteFoods.map((item) => {
        return item.id === action.payload.id ? action.payload : item;
      });
    },
  },
});

const { reducer: favoriteFoodsReducer } = favoriteFoodsSlice;

export const { setFavoriteList, addFavorite, removeFavorite, editFavorite } =
  favoriteFoodsSlice.actions;

export default favoriteFoodsReducer;
