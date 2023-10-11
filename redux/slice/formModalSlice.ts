import { createSlice } from '@reduxjs/toolkit';

export const initialState: { expiredDateModal: boolean } = {
  expiredDateModal: false,
};

const formModalSlice = createSlice({
  name: 'formModalVisible',
  initialState,
  reducers: {
    toggleExpiredDateModal: (state, action: { payload: boolean }) => {
      state.expiredDateModal = action.payload;
    },
  },
});

const { reducer: toggleFormModalReducer } = formModalSlice;

export const { toggleExpiredDateModal } = formModalSlice.actions;

export default toggleFormModalReducer;
