import { createSlice } from '@reduxjs/toolkit';
import { Food, initialFridgeFood } from '../../../constant/foodInfo';

export const initialState: { formFood: Food; originFood: Food } = {
  formFood: initialFridgeFood,
  originFood: initialFridgeFood,
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
    saveOriginFood: (state, { payload }: FormFoodPayload) => {
      state.originFood = payload;
    },
  },
});

const { reducer: formFoodReducer } = formFoodSlice;

export const { setFormFood, editFormFood, saveOriginFood } =
  formFoodSlice.actions;

export default formFoodReducer;
