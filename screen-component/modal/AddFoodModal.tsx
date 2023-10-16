import { View } from 'react-native';
import { FoodLocation } from '../../constant/fridgeInfo';
import { FormStep } from '../../constant/formInfo';
import { useAddFood } from '../../hooks';
import { initialFridgeFood, initialPantryFood } from '../../constant/foodInfo';
import { useSelector } from '../../redux/hook';
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
  const { expiredDateModal } = useSelector((state) => state.formModalVisible);

  const initialFood = foodLocation ? initialFridgeFood : initialPantryFood;

  const { newFood, changeFoodInfo, onAddSubmit } = useAddFood({
    initialFood,
    foodLocation,
  });

  const insets = useSafeAreaInsets();

  return (
    <Modal
      title='새로운 식료품 추가'
      isVisible={modalVisible}
      closeModal={() => {
        changeFoodInfo({ ...initialFood });
        setModalVisible(false);
      }}
      overlapped={!!expiredDateModal}
    >
      <View
        style={tw.style(`bg-stone-100`, {
          paddingBottom: insets?.bottom + 12,
        })}
      >
        <Form
          title='새로운 식료품 추가'
          editableName={true}
          food={newFood}
          changeInfo={changeFoodInfo}
          formSteps={formSteps}
        />

        <View style={tw`mx-6`}>
          <SubmitBtn
            iconName='plus'
            color='blue'
            btnName='식료품 추가하기'
            onPress={() => {
              onAddSubmit(setModalVisible);
              scrollEnd();
            }}
          />
        </View>
      </View>
    </Modal>
  );
}
