import { createSlice } from '@reduxjs/toolkit';

export const initialState: { onboarding: boolean } = {
  onboarding: true,
};

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    toggleOnboarding: (state, action: { payload: boolean }) => {
      state.onboarding = action.payload;
    },
  },
});

const { reducer: toggleOnboardingReducer } = onboardingSlice;

export const { toggleOnboarding } = onboardingSlice.actions;

export default toggleOnboardingReducer;
