import { createSlice } from '@reduxjs/toolkit';
import { Filter } from '../../util';

export const initialState: { filter: Filter; pantryFilter: Filter } = {
  filter: '전체',
  pantryFilter: '전체',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeFilter: (state, action: { payload: Filter }) => {
      state.filter = action.payload;
    },
    changePantryFilter: (state, action: { payload: Filter }) => {
      state.pantryFilter = action.payload;
    },
  },
});

const { reducer: changeFilterReducer } = filterSlice;

export const { changeFilter, changePantryFilter } = filterSlice.actions;

export default changeFilterReducer;
