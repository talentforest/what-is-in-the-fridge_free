import { createSlice } from '@reduxjs/toolkit';

export const initialState: { dragMode: boolean } = {
  dragMode: false,
};

const dragModeSlice = createSlice({
  name: 'dragMode',
  initialState,
  reducers: {
    toggleDragMode: (state, action: { payload: boolean }) => {
      state.dragMode = action.payload;
    },
  },
});

const { reducer: toggleDragModeReducer } = dragModeSlice;

export const { toggleDragMode } = dragModeSlice.actions;

export default toggleDragModeReducer;
