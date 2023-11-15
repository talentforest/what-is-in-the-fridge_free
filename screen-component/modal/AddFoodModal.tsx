import { View } from 'react-native';
import { FoodLocation } from '../../constant/fridgeInfo';
import { FormStep } from '../../constant/formInfo';
import { useAddFood } from '../../hooks';
import { initialFridgeFood, initialPantryFood } from '../../constant/foodInfo';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Modal from '../../components/modal/Modal';
import Form from '../../components/form/Form';
import SubmitBtn from '../../components/buttons/SubmitBtn';
import tw from 'twrnc';

interface Props {
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
  formSteps: FormStep[];
  foodLocation?: FoodLocation;
  scrollEnd: () => void;
}

export default function AddFoodModal({
  foodLocation,
  modalVisible,
  setModalVisible,
  formSteps,
  scrollEnd,
}: Props) {
  const initialFood = foodLocation ? initialFridgeFood : initialPantryFood;

  const { newFood, changeFoodInfo, onAddSubmit } = useAddFood({
    initialFood,
    foodLocation,
  });

  const insets = useSafeAreaInsets();

  const closeModal = () => {
    changeFoodInfo({ ...initialFood });
    setModalVisible(false);
  };

  const onSubmitPress = () => {
    onAddSubmit(setModalVisible, modalVisible);
    scrollEnd();
  };

  return (
    <Modal
      title='새로운 식료품 추가'
      isVisible={modalVisible}
      closeModal={closeModal}
    >
      <View style={{ paddingBottom: insets?.bottom }}>
        <View style={tw`-mx-4`}>
          <Form
            title='새로운 식료품 추가'
            food={newFood}
            changeInfo={changeFoodInfo}
            formSteps={formSteps}
          />
        </View>

        <SubmitBtn
          iconName='plus'
          color='blue'
          btnName='식료품 추가하기'
          onPress={onSubmitPress}
        />
      </View>
    </Modal>
  );
}
