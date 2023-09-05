import { createSlice } from '@reduxjs/toolkit';
import { Filter } from '../../util';

export const initialState: { currentFilter: Filter } = {
  currentFilter: '전체',
};

const filterSlice = createSlice({
  name: 'currentFilter',
  initialState,
  reducers: {
    changeFilter: (state, action: { payload: Filter }) => {
      state.currentFilter = action.payload;
    },
  },
});

const { reducer: changeFilterReducer } = filterSlice;

export const { changeFilter } = filterSlice.actions;

export default changeFilterReducer;
