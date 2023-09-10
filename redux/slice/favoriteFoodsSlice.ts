import { createSlice } from '@reduxjs/toolkit';
import { Food, PantryFood } from '../../constant/foodInfo';
import { deduplicate } from '../../util/deduplicate';

export const initialState: { favoriteFoods: (Food | PantryFood)[] } = {
  favoriteFoods: [],
};

const favoriteFoodsSlice = createSlice({
  name: 'favoriteFoods',
  initialState,
  reducers: {
    setFavoriteList: (state, action: { payload: (Food | PantryFood)[] }) => {
      state.favoriteFoods = deduplicate(action.payload);
    },
    addFavorite: (state, action: { payload: Food | PantryFood }) => {
      state.favoriteFoods = deduplicate([
        ...state.favoriteFoods,
        action.payload,
      ]);
    },
    removeFavorite: (state, action: { payload: { name: string } }) => {
      state.favoriteFoods = state.favoriteFoods.filter(
        (item) => item.name !== action.payload.name
      );
    },
    editFavorite: (state, action: { payload: Food | PantryFood }) => {
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
