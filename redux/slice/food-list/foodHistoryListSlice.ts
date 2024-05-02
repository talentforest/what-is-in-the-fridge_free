import { createSlice } from '@reduxjs/toolkit';
import { deduplicateByName } from '../../../util';

export const initialState: { foodHistoryList: { name: string }[] } = {
  foodHistoryList: [],
};

const foodHistoryListSlice = createSlice({
  name: 'foodHistoryList',
  initialState,
  reducers: {
    resetFoodHistoryList: (state) => {
      state.foodHistoryList = [];
    },
    addInFoodHistoryList: (state, action: { payload: string }) => {
      state.foodHistoryList = deduplicateByName([
        ...state.foodHistoryList,
        { name: action.payload },
      ]);
    },
  },
});

const { reducer: foodHistoryListReducer } = foodHistoryListSlice;

export const { addInFoodHistoryList, resetFoodHistoryList } =
  foodHistoryListSlice.actions;

export default foodHistoryListReducer;
