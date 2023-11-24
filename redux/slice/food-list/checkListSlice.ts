import { createSlice } from '@reduxjs/toolkit';
import { Food } from '../../../constant/foodInfo';

export const initialState: { checkedList: Food[] } = {
  checkedList: [],
};

const checkedListSlice = createSlice({
  name: 'checkedList',
  initialState,
  reducers: {
    setCheckedList: (state, action: { payload: Food[] }) => {
      state.checkedList = action.payload;
    },
  },
});

const { reducer: checkedListReducer } = checkedListSlice;

export const { setCheckedList } = checkedListSlice.actions;

export default checkedListReducer;
