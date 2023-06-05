import { createSlice } from '@reduxjs/toolkit';

export type FreezerLocation = 'top' | 'bottom';
export type Space =
  | 'freezerInner'
  | 'freezerDoor'
  | 'fridgeInner'
  | 'fridgeDoor';

interface FridgeInfo {
  type: '일반형 냉장고';
  freezer: FreezerLocation;
  compartments: { [key in Space]: number };
}

export const initialState: { fridgeInfo: FridgeInfo } = {
  fridgeInfo: {
    type: '일반형 냉장고',
    freezer: 'top',
    compartments: {
      freezerInner: 2,
      freezerDoor: 2,
      fridgeInner: 3,
      fridgeDoor: 3,
    },
  },
};

const fridgeInfoSlice = createSlice({
  name: 'fridgeInfo',
  initialState,
  reducers: {
    changeLocation: (
      state,
      action: { payload: { freezer: FreezerLocation } }
    ) => {
      state.fridgeInfo = { ...state.fridgeInfo, ...action.payload };
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

export const { changeLocation, plusCompartment, minusCompartment } =
  fridgeInfoSlice.actions;

export default fridgeInfoReducer;
