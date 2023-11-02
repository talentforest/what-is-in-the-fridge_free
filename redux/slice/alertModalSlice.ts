import { createSlice } from '@reduxjs/toolkit';

export type AlertBtns =
  | '취소'
  | '확인'
  | '삭제 후 다시 추가'
  | '한번에 추가'
  | '삭제';

export interface AlertInfo {
  title: string;
  msg: string;
  btns: AlertBtns[];
}

interface Props {
  alertModalVisible: boolean;
  alertInfo: AlertInfo;
}

export const initialState: Props = {
  alertModalVisible: false,
  alertInfo: {
    title: '',
    msg: '',
    btns: ['취소', '확인'],
  },
};

const alertModalSlice = createSlice({
  name: 'alertModalSlice',
  initialState,
  reducers: {
    toggleAlertModal: (state, action: { payload: boolean }) => {
      state.alertModalVisible = action.payload;
    },
    setAlertInfo: (state, action: { payload: AlertInfo }) => {
      state.alertInfo = action.payload;
    },
  },
});

const { reducer: toggleAlertModalReducer } = alertModalSlice;

export const { toggleAlertModal, setAlertInfo } = alertModalSlice.actions;

export default toggleAlertModalReducer;
