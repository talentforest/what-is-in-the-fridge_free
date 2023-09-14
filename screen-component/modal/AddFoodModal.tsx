import { View } from 'react-native';
import { FoodLocation } from '../../constant/fridgeInfo';
import { FormStep } from '../../constant/formInfo';
import { useAddFood } from '../../hooks';
import { initialFood } from '../../constant/foodInfo';

import Modal from '../../components/modal/Modal';
import Form from '../../components/form/Form';
import SubmitBtn from '../../components/buttons/SubmitBtn';
import tw from 'twrnc';

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
  const { newFood, changeFoodInfo, onAddSubmit } = useAddFood({
    initialFoodInfo: initialFood,
    foodLocation,
  });

  return (
    <Modal
      title='새로운 식료품 추가'
      setModalVisible={setModalVisible}
      modalVisible={modalVisible}
      hasBackdrop
    >
      <View>
        {foodLocation && (
          <Form
            title='새로운 식료품 추가'
            editableName={true}
            food={newFood}
            changeInfo={changeFoodInfo}
            formSteps={formSteps}
          />
        )}
      </View>
      <View style={tw`mx-6`}>
        <SubmitBtn
          color='blue'
          btnName={`${foodLocation.compartmentNum}칸에 식료품 추가`}
          onPress={() => {
            onAddSubmit(setModalVisible);
          }}
        />
      </View>
    </Modal>
  );
}
