import { FoodLocation } from '../../../constant/fridgeInfo';
import { FormLabel, FormStep, foodForm } from '../../../constant/formInfo';
import RNModal from '../../common/modal/Modal';
import useAddFood from '../../../hooks/useAddFood';
import Form from '../../common/form/Form';
import SubmitBtn from '../../common/form/SubmitBtn';

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
    <RNModal
      title='새로운 식료품 추가'
      setModalVisible={setModalVisible}
      modalVisible={modalVisible}
    >
      {foodLocation && (
        <Form
          title='새로운 식료품 추가'
          editableName={true}
          items={foodForm as FormLabel[]}
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
    </RNModal>
  );
}
