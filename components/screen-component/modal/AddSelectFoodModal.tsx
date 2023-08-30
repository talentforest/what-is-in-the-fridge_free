import {
  FormLabelType,
  FormStep,
  shoppingListForm,
} from '../../../constant/formInfo';

import useAddSelectFood from '../../../hooks/useAddSelectFood';

import Modal from '../../common/modal/Modal';
import Form from '../../common/form/Form';
import SubmitBtn from '../../common/buttons/SubmitBtn';

interface Props {
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
  formSteps: FormStep[];
}

export default function AddSelectFoodModal({
  modalVisible,
  setModalVisible,
  formSteps,
}: Props) {
  const { selectedFood, onChange, onSubmit } = useAddSelectFood();

  return (
    <Modal
      title='장보기 목록 식료품 추가'
      setModalVisible={setModalVisible}
      modalVisible={modalVisible}
    >
      <Form
        title='장보기 목록 식료품 추가'
        items={shoppingListForm as FormLabelType[]}
        food={selectedFood}
        changeInfo={onChange}
        formSteps={formSteps}
      />
      <SubmitBtn
        btnName='식료품 정보 추가하기'
        onPress={() => onSubmit(setModalVisible)}
      />
    </Modal>
  );
}
