import { createSlice } from '@reduxjs/toolkit';
import { initialTime } from '../../util';

type notificationState = {
  notification: boolean;
  approachDate: number;
  time: string;
};

export const initialState: notificationState = {
  notification: false,
  approachDate: 3,
  time: initialTime,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    toggleNotification: (state, action: { payload: boolean }) => {
      state.notification = action.payload;
    },
    setApproachDate: (state, action: { payload: number }) => {
      state.approachDate = action.payload;
    },
    setTime: (state, action: { payload: string }) => {
      state.time = action.payload;
    },
  },
});

const { reducer: notificationReducer } = notificationSlice;

export const { toggleNotification, setApproachDate, setTime } =
  notificationSlice.actions;

export default notificationReducer;
