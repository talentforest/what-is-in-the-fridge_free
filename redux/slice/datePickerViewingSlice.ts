import { createSlice } from '@reduxjs/toolkit';

export type DatePickerViewing = '숫자로 날짜 입력' | '달력으로 날짜 입력';

export const initialState: { datePickerViewing: DatePickerViewing } = {
  datePickerViewing: '숫자로 날짜 입력',
};

const datePickerViewingSlice = createSlice({
  name: 'datePickerViewing',
  initialState,
  reducers: {
    changeDatePickerViewing: (
      state,
      action: { payload: DatePickerViewing }
    ) => {
      state.datePickerViewing = action.payload;
    },
  },
});

const { reducer: datePickerViewingReducer } = datePickerViewingSlice;

export const { changeDatePickerViewing } = datePickerViewingSlice.actions;

export default datePickerViewingReducer;
