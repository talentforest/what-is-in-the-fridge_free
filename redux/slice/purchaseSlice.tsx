import { createSlice } from '@reduxjs/toolkit';

type PurchasedState = {
  purchased: true;
  purchaseToken: string;
};

type NotPurchasedState = {
  purchased: false;
};

type PurchaseState = PurchasedState | NotPurchasedState;

export const initialState: PurchaseState = {
  purchased: false,
};

const purchaseSlice = createSlice({
  name: 'purchaseState',
  initialState,
  reducers: {
    togglePurchaseState: (
      state: PurchaseState,
      { payload }: { payload: PurchaseState }
    ) => {
      state = payload;
    },
  },
});

const { reducer: purchaseReducer } = purchaseSlice;

export const { togglePurchaseState } = purchaseSlice.actions;

export default purchaseReducer;
