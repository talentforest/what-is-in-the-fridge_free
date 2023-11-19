import { createSlice } from '@reduxjs/toolkit';
import { Food, initialFridgeFood } from '../../constant/foodInfo';

export const initialState: { formFood: Food; originalFood: Food } = {
  formFood: initialFridgeFood,
  originalFood: initialFridgeFood,
};

type FormFoodPayload = { payload: Food };

type NewFormInfoPayload = {
  payload: { [key: string]: string | boolean };
};

const formFoodSlice = createSlice({
  name: 'formFood',
  initialState,
  reducers: {
    setFormFood: (state, { payload }: FormFoodPayload) => {
      state.formFood = payload;
    },
    editFormFood: (state, { payload }: NewFormInfoPayload) => {
      state.formFood = { ...state.formFood, ...payload };
    },
    saveOriginalFood: (state, { payload }: FormFoodPayload) => {
      state.originalFood = payload;
    },
  },
});

const { reducer: formFoodReducer } = formFoodSlice;

export const { setFormFood, editFormFood, saveOriginalFood } =
  formFoodSlice.actions;

export default formFoodReducer;
