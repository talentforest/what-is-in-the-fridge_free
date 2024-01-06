import { createSlice } from '@reduxjs/toolkit';
import { initialTime } from '../../util';

type notificationState = {
  notification: boolean;
  expiredSoonDay: number;
  time: string;
};

export const initialState: notificationState = {
  notification: false,
  expiredSoonDay: 3,
  time: initialTime,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    toggleNotification: (state, action: { payload: boolean }) => {
      state.notification = action.payload;
    },
    setExpiredSoonDay: (state, action: { payload: number }) => {
      state.expiredSoonDay = action.payload;
    },
    setTime: (state, action: { payload: string }) => {
      state.time = action.payload;
    },
  },
});

const { reducer: notificationReducer } = notificationSlice;

export const { toggleNotification, setExpiredSoonDay, setTime } =
  notificationSlice.actions;

export default notificationReducer;
