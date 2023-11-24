import { createSlice } from '@reduxjs/toolkit';

export type AnimationState = 'none' | 'slideup-out';

export const initialState: { afterAnimation: AnimationState } = {
  afterAnimation: 'none',
};

const afterAnimationSlice = createSlice({
  name: 'afterAnimation',
  initialState,
  reducers: {
    setAfterAnimation: (state, action: { payload: AnimationState }) => {
      state.afterAnimation = action.payload;
    },
  },
});

const { reducer: afterAnimationReducer } = afterAnimationSlice;

export const { setAfterAnimation } = afterAnimationSlice.actions;

export default afterAnimationReducer;
