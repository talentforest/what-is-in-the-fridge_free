import { createSlice } from '@reduxjs/toolkit';

type initialState = {
  isMemoOpen: boolean;
  isExpiredItemClosed: boolean;
  isPurchaseItemOpen: boolean;
};

export const initialState: initialState = {
  isMemoOpen: false,
  isExpiredItemClosed: false,
  isPurchaseItemOpen: false,
};

const isFormItemOpenSlice = createSlice({
  name: 'isFormItemOpen',
  initialState,
  reducers: {
    toggleMemoOpen: (state, action: { payload: boolean }) => {
      state.isMemoOpen = action.payload;
    },
    toggleExpiredItemClosed: (state, action: { payload: boolean }) => {
      state.isExpiredItemClosed = action.payload;
    },
    togglePurchaseItemOpen: (state, action: { payload: boolean }) => {
      state.isPurchaseItemOpen = action.payload;
    },
  },
});

const { reducer: toggleFormItemOpenReducer } = isFormItemOpenSlice;

export const {
  toggleMemoOpen,
  toggleExpiredItemClosed,
  togglePurchaseItemOpen,
} = isFormItemOpenSlice.actions;

export default toggleFormItemOpenReducer;
