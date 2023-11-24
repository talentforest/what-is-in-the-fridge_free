import { createSlice } from '@reduxjs/toolkit';

export const initialState: { searchedFoodName: String } = {
  searchedFoodName: '',
};

const searchedFoodNameSlice = createSlice({
  name: 'searchedFoodName',
  initialState,
  reducers: {
    search: (state, action: { payload: string }) => {
      state.searchedFoodName = action.payload;
    },
  },
});

const { reducer: searchedFoodNameReducer } = searchedFoodNameSlice;

export const { search } = searchedFoodNameSlice.actions;

export default searchedFoodNameReducer;
