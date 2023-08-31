import { FoodLocation } from '../../constant/fridgeInfo';
import { FormLabelType, FormStep, foodForm } from '../../constant/formInfo';
import { useAddFood } from '../../hooks';

import Modal from '../../components/modal/Modal';
import Form from '../../components/form/Form';
import SubmitBtn from '../../components/buttons/SubmitBtn';

interface Props {
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
  foodLocation: FoodLocation;
  formSteps: FormStep[];
}

export default function AddFoodModal({
  foodLocation,
  modalVisible,
  setModalVisible,
  formSteps,
}: Props) {
  const { newFood, addFoodInfo, onAddSubmit } = useAddFood({ foodLocation });

  return (
    <Modal
      title='새로운 식료품 추가'
      setModalVisible={setModalVisible}
      modalVisible={modalVisible}
    >
      {foodLocation && (
        <Form
          title='새로운 식료품 추가'
          editableName={true}
          items={foodForm as FormLabelType[]}
          food={newFood}
          changeInfo={addFoodInfo}
          formSteps={formSteps}
        />
      )}
      <SubmitBtn
        btnName='식료품 정보 추가하기'
        onPress={() => {
          onAddSubmit(setModalVisible);
        }}
      />
    </Modal>
  );
}
