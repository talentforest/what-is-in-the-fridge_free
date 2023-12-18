import { createSlice } from '@reduxjs/toolkit';
import { Space } from '../../constant/fridgeInfo';

export type FreezerLocation = 'top' | 'bottom';

export type MaxCompartmentsNumObj = { [key in Space]: number };

interface FridgeInfo {
  type: '일반형 냉장고' | '냉장고 타입 설정 없음';
  freezer: FreezerLocation;
  compartments: MaxCompartmentsNumObj;
}

export const initialState: { fridgeInfo: FridgeInfo } = {
  fridgeInfo: {
    type: '일반형 냉장고',
    freezer: 'top',
    compartments: {
      '냉동실 안쪽': 2,
      '냉동실 문쪽': 2,
      '냉장실 안쪽': 3,
      '냉장실 문쪽': 3,
      팬트리: 1,
    },
  },
};

const fridgeInfoSlice = createSlice({
  name: 'fridgeInfo',
  initialState,
  reducers: {
    changeSetting: (state, action: { payload: FridgeInfo }) => {
      state.fridgeInfo = { ...action.payload };
    },
    plusCompartment: (state, action: { payload: Space }) => {
      state.fridgeInfo = {
        ...state.fridgeInfo,
        compartments: {
          ...state.fridgeInfo.compartments,
          [action.payload]: state.fridgeInfo.compartments[action.payload] + 1,
        },
      };
    },
    minusCompartment: (state, action: { payload: Space }) => {
      state.fridgeInfo = {
        ...state.fridgeInfo,
        compartments: {
          ...state.fridgeInfo.compartments,
          [action.payload]: state.fridgeInfo.compartments[action.payload] - 1,
        },
      };
    },
  },
});

const { reducer: fridgeInfoReducer } = fridgeInfoSlice;

export const { changeSetting, plusCompartment, minusCompartment } =
  fridgeInfoSlice.actions;

export default fridgeInfoReducer;
