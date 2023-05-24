import { createSlice } from '@reduxjs/toolkit';

export const initialState: { searchKeyword: string } = {
  searchKeyword: '',
};

const searchKeywordSlice = createSlice({
  name: 'searchKeyword',
  initialState,
  reducers: {
    search: (state, action: { payload: string }) => {
      state.searchKeyword = action.payload;
    },
  },
});

const { reducer: searchKeywordReducer } = searchKeywordSlice;

export const { search } = searchKeywordSlice.actions;

export default searchKeywordReducer;
