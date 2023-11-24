import { createSlice } from '@reduxjs/toolkit';
import { CompartmentNum } from '../../constant/fridgeInfo';

type CompartmentModal = {
  modalVisible: boolean;
  compartmentNum?: CompartmentNum;
};

export type AddAtOneStepName = '한번에 추가할 공간' | '추가할 식료품 정보';

export interface AddAtOnceStep {
  step: number;
  name: AddAtOneStepName;
}

export const addAtOnceStep: AddAtOnceStep[] = [
  { step: 1, name: '한번에 추가할 공간' },
  { step: 2, name: '추가할 식료품 정보' },
];

type AddAtOnceModal = {
  modalVisible: boolean;
  currentStep: AddAtOnceStep;
};

export const initialState: {
  formModal: boolean;
  expiredDateModal: boolean;
  addAtOnceModal: AddAtOnceModal;
  categoryModalVisible: boolean;
  categoryFilterModalVisible: boolean;
  openFoodDetailModal: boolean;
  expandCompartmentModal: CompartmentModal;
  openAddFoodModal: CompartmentModal;
} = {
  formModal: false,
  addAtOnceModal: {
    modalVisible: false,
    currentStep: { step: 1, name: '한번에 추가할 공간' },
  },
  expiredDateModal: false,
  categoryModalVisible: false,
  categoryFilterModalVisible: false,
  openFoodDetailModal: false,
  expandCompartmentModal: { modalVisible: false, compartmentNum: '1번' },
  openAddFoodModal: { modalVisible: false, compartmentNum: '1번' },
};

const modalVisibleSlice = createSlice({
  name: 'modalVisible',
  initialState,
  reducers: {
    showFormModal: (state, action: { payload: boolean }) => {
      state.formModal = action.payload;
    },
    showAddAtOnceModal: (
      state,
      { payload }: { payload: boolean | AddAtOnceModal }
    ) => {
      if (typeof payload === 'boolean') {
        state.addAtOnceModal = {
          modalVisible: payload,
          currentStep: { step: 1, name: '한번에 추가할 공간' },
        };
      } else {
        state.addAtOnceModal = payload;
      }
    },
    changeAddAtOnceStep: (state, { payload }: { payload: AddAtOnceStep }) => {
      state.addAtOnceModal = { ...state.addAtOnceModal, currentStep: payload };
    },
    showExpiredDateModal: (state, action: { payload: boolean }) => {
      state.expiredDateModal = action.payload;
    },
    showCategoryModal: (state, { payload }: { payload: boolean }) => {
      state.categoryModalVisible = payload;
    },
    showCategoryFilterModal: (state, { payload }: { payload: boolean }) => {
      state.categoryFilterModalVisible = payload;
    },
    showOpenFoodDetailModal: (state, { payload }: { payload: boolean }) => {
      state.openFoodDetailModal = payload;
    },
    showExpandCompartmentModal: (
      state,
      { payload }: { payload: CompartmentModal }
    ) => {
      state.expandCompartmentModal = payload;
    },
    showOpenAddFoodModal: (
      state,
      { payload }: { payload: CompartmentModal | boolean }
    ) => {
      if (typeof payload === 'boolean') {
        state.openAddFoodModal = {
          ...state.openAddFoodModal,
          modalVisible: payload,
        };
      } else {
        state.openAddFoodModal = payload;
      }
    },
  },
});

const { reducer: modalVisibleReducer } = modalVisibleSlice;

export const {
  showExpiredDateModal,
  showFormModal,
  showAddAtOnceModal,
  changeAddAtOnceStep,
  showCategoryModal,
  showCategoryFilterModal,
  showOpenFoodDetailModal,
  showExpandCompartmentModal,
  showOpenAddFoodModal,
} = modalVisibleSlice.actions;

export default modalVisibleReducer;
