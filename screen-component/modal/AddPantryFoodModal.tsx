import {
  Text,
  TouchableOpacity,
} from '../../components/common/native-component';
import { View } from 'react-native';
import { Food, initialPantryFood } from '../../constant/foodInfo';
import { FontGmarketSansBold } from '../../constant/fonts';
import { formTwoSteps } from '../../constant/formInfo';
import { useAddFood, useEditFood } from '../../hooks';
import { GRAY } from '../../constant/colors';

import Modal from '../../components/modal/Modal';
import SubmitBtn from '../../components/buttons/SubmitBtn';
import Form from '../../components/form/Form';
import Icon from '../../components/common/native-component/Icon';
import tw from 'twrnc';

interface Props {
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
  foodToEdit?: Food;
}

export default function AddPantryFoodModal({
  modalVisible,
  setModalVisible,
  foodToEdit,
}: Props) {
  const { newFood, changeFoodInfo, onAddSubmit } = useAddFood({
    initialFoodInfo: initialPantryFood,
  });

  const { editedFood, editFoodInfo, onEditSumbit } = useEditFood({
    food: foodToEdit ? foodToEdit : initialPantryFood,
  });

  return (
    <Modal
      title={foodToEdit ? '팬트리 식료품 수정' : '팬트리 식료품 추가'}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      hasBackdrop
      animationIn='fadeIn'
      animationOut='fadeOut'
    >
      <View style={tw`py-6`}>
        <View style={tw`mb-1 px-6 flex-row justify-between items-center`}>
          <Text style={tw.style('text-[17px]', FontGmarketSansBold)}>
            {foodToEdit ? '팬트리 식료품 수정' : '팬트리 식료품 추가'}
          </Text>
          <TouchableOpacity
            style={tw`p-2 -mx-2`}
            onPress={() => setModalVisible(false)}
          >
            <Icon name='close' type='Ionicons' size={21} color={GRAY} />
          </TouchableOpacity>
        </View>

        <Form
          title={foodToEdit ? '팬트리 식료품 수정' : '팬트리 식료품 추가'}
          editableName={foodToEdit ? false : true}
          food={foodToEdit ? editedFood : newFood}
          changeInfo={foodToEdit ? editFoodInfo : changeFoodInfo}
          formSteps={formTwoSteps}
        />

        <View style={tw`mx-6`}>
          <SubmitBtn
            iconName='plus'
            color='amber'
            btnName={foodToEdit ? '팬트리 식료품 수정' : '팬트리에 추가'}
            onPress={
              foodToEdit
                ? () => onEditSumbit(foodToEdit.id, setModalVisible)
                : () => onAddSubmit(setModalVisible)
            }
          />
        </View>
      </View>
    </Modal>
  );
}
