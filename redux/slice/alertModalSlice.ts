import { createSlice } from '@reduxjs/toolkit';

export type AlertTitle =
  | '식료품 개수 한도 도달'
  | '한번에 추가할 식료품 개수 초과'
  | '식료품 이름 미작성'
  | '유효하지 않은 소비기한'
  | '이미 갖고 있는 식료품'
  | '카테고리 변경 알림'
  | '식료품 이동 알림'
  | '식료품 존재 안내'
  | '식료품 한번에 추가'
  | '자주 먹는 식료품 삭제'
  | '식료품 삭제'
  | '장보기 식료품 삭제'
  | '장보기 목록 추가'
  | '식료품 추가 완료'
  | '폰트 변경 완료'
  | '모든 식료품 추가 완료'
  | '이용권 구매 오류'
  | '이용권 복원 실패'
  | '이용권 복원 성공'
  | '이용권 이용중 안내'
  | '식료품 데이터 초기화'
  | '데이터 초기화 완료';

export type AlertBtnName =
  | '닫기'
  | '취소'
  | '삭제'
  | '확인'
  | '한번에 추가'
  | '바로 이동하기'
  | '이용권 구매하러 가기';

export interface AlertInfo {
  title: AlertTitle;
  msg: string;
  btns: AlertBtnName[];
}

interface Props {
  alertModalVisible: boolean;
  alertInfo: AlertInfo;
}

export const initialState: Props = {
  alertModalVisible: false,
  alertInfo: {
    title: '식료품 존재 안내',
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
    alert: (state, action: { payload: AlertInfo }) => {
      state.alertModalVisible = true;
      state.alertInfo = action.payload;
    },
  },
});

const { reducer: toggleAlertModalReducer } = alertModalSlice;

export const { toggleAlertModal, alert } = alertModalSlice.actions;

export default toggleAlertModalReducer;
