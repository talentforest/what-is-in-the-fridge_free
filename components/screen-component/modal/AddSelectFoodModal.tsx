import {
  FormLabel,
  FormStep,
  shoppingListForm,
} from '../../../constant/formInfo';
import Form from '../../common/form/Form';
import RNModal from '../../common/modal/Modal';
import useAddSelectFood from '../../../hooks/useAddSelectFood';
import SubmitBtn from '../../common/form/SubmitBtn';

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
    <RNModal
      title='식료품 추가'
      setModalVisible={setModalVisible}
      modalVisible={modalVisible}
    >
      <Form
        editableName={false}
        items={shoppingListForm as FormLabel[]}
        food={selectedFood}
        changeInfo={onChange}
        formSteps={formSteps}
      />
      <SubmitBtn
        btnName='식료품 정보 추가하기'
        onPress={() => {
          onSubmit();
          setModalVisible(false);
        }}
      />
    </RNModal>
  );
}
