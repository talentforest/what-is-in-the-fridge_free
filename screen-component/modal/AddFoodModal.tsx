import { View } from 'react-native';
import { FoodLocation } from '../../constant/fridgeInfo';
import { FormStep } from '../../constant/formInfo';
import { useAddFood } from '../../hooks';
import { initialFood, initialPantryFood } from '../../constant/foodInfo';
import { PlatformIOS } from '../../constant/statusBarHeight';

import Modal from '../../components/modal/Modal';
import Form from '../../components/form/Form';
import SubmitBtn from '../../components/buttons/SubmitBtn';
import tw from 'twrnc';

interface Props {
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
  formSteps: FormStep[];
  foodLocation?: FoodLocation;
}

export default function AddFoodModal({
  foodLocation,
  modalVisible,
  setModalVisible,
  formSteps,
}: Props) {
  const { newFood, changeFoodInfo, onAddSubmit } = useAddFood({
    initialFood: foodLocation ? initialFood : initialPantryFood,
    foodLocation,
  });

  return (
    <Modal
      title='새로운 식료품 추가'
      closeModal={() => setModalVisible(false)}
      isVisible={modalVisible}
    >
      <View style={tw`bg-stone-100 pb-${PlatformIOS ? '12' : '6'}`}>
        <Form
          title='새로운 식료품 추가'
          editableName={true}
          food={newFood}
          changeInfo={changeFoodInfo}
          formSteps={formSteps}
        />

        <View style={tw`mx-6`}>
          <SubmitBtn
            color='blue'
            btnName='식료품 추가하기'
            onPress={() => {
              onAddSubmit(setModalVisible);
            }}
          />
        </View>
      </View>
    </Modal>
  );
}
