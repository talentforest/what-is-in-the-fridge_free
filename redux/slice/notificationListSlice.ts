import { createSlice } from '@reduxjs/toolkit';
import { getISODate } from '../../util';

interface NotificationType {
  id: string;
  title: string;
  body: string;
  data: { data: string };
  date: string;
}

const initialState: { notificationList: NotificationType[] } = {
  notificationList: [
    {
      id: '1',
      title: '',
      body: '가지의 유통기한이 3일 이내입니다.',
      data: { data: '1' },
      date: getISODate(new Date()),
    },
    {
      id: '2',
      title: '2',
      body: '포도의 유통기한이 3일 이내입니다.',
      data: { data: '2' },
      date: getISODate(new Date()),
    },
    {
      id: '3',
      title: '3',
      body: '오렌지의 유통기한이 3일 이내입니다.',
      data: { data: '3' },
      date: getISODate(new Date()),
    },
  ],
};

const notificationListSlice = createSlice({
  name: 'notificationList',
  initialState,
  reducers: {
    addNotification: (state, action: { payload: NotificationType }) => {
      state.notificationList = [...state.notificationList, action.payload];
    },
    removeNotification: (state, action: { payload: { id: string } }) => {
      state.notificationList = state.notificationList.filter(
        (item) => item.id !== action.payload.id
      );
    },
  },
});

const { reducer: notificationListReducer } = notificationListSlice;

export const { addNotification, removeNotification } =
  notificationListSlice.actions;

export default notificationListReducer;
