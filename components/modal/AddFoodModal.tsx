import { FoodLocation } from '../../constant/fridgeInfo';
import { FormStep } from '../../constant/formInfo';
import RNModal from './common/Modal';
import useAddFood from '../../hooks/useAddFood';
import Form from './form/Form';
import SubmitBtn from './form/SubmitBtn';

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
      title='식료품 추가'
      setModalVisible={setModalVisible}
      modalVisible={modalVisible}
    >
      {foodLocation && (
        <Form
          editableName={true}
          items={[
            '이름',
            '카테고리',
            '구매날짜',
            '유통기한',
            '자주 먹는 식품인가요?',
          ]}
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
