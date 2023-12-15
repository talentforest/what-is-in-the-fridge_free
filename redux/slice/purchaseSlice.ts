import { createSlice } from '@reduxjs/toolkit';

type PurchaseState = {
  purchased: boolean;
  purchaseToken: string | null;
};

export const initialState: PurchaseState = {
  purchased: false,
  purchaseToken: null,
};

const purchaseSlice = createSlice({
  name: 'purchaseState',
  initialState,
  reducers: {
    togglePurchaseState: (state, action: { payload: PurchaseState }) => {
      state.purchased = action.payload.purchased;
      state.purchaseToken = action.payload.purchaseToken;
    },
  },
});

const { reducer: purchaseReducer } = purchaseSlice;

export const { togglePurchaseState } = purchaseSlice.actions;

export default purchaseReducer;
