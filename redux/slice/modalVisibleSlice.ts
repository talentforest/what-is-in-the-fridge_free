import { createSlice } from '@reduxjs/toolkit';
import { CompartmentNum } from '../../constant/fridgeInfo';

type CompartmentModal = {
  modalVisible: boolean;
  compartmentNum?: CompartmentNum;
};

export const initialState: {
  formModal: boolean;
  expiredDateModal: boolean;
  addAtOnceModal: boolean;
  categoryModalVisible: boolean;
  categoryFilterModalVisible: boolean;
  openFoodDetailModal: boolean;
  expandCompartmentModal: CompartmentModal;
  openAddFoodModal: CompartmentModal;
} = {
  formModal: false,
  addAtOnceModal: false,
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
    showAddAtOnceModal: (state, action: { payload: boolean }) => {
      state.addAtOnceModal = action.payload;
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
  showCategoryModal,
  showCategoryFilterModal,
  showOpenFoodDetailModal,
  showExpandCompartmentModal,
  showOpenAddFoodModal,
} = modalVisibleSlice.actions;

export default modalVisibleReducer;
