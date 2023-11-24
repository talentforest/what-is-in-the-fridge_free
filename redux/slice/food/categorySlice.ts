import { createSlice } from '@reduxjs/toolkit';
import { Category } from '../../../constant/foodCategories';

export const initialState: { category: Category } = {
  category: '신선식품류',
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    changeCategory: (state, { payload }: { payload: Category }) => {
      state.category = payload;
    },
  },
});

const { reducer: categoryReducer } = categorySlice;

export const { changeCategory } = categorySlice.actions;

export default categoryReducer;
