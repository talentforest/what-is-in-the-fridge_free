import {
  Text,
  TouchableOpacity,
} from '../../components/common/native-component';
import { View } from 'react-native';
import { initialPantryFood } from '../../constant/foodInfo';
import { FontGmarketSansBold } from '../../constant/fonts';
import { formTwoSteps } from '../../constant/formInfo';
import { useAddFood } from '../../hooks';
import { GRAY } from '../../constant/colors';

import Modal from '../../components/modal/Modal';
import SubmitBtn from '../../components/buttons/SubmitBtn';
import Form from '../../components/form/Form';
import tw from 'twrnc';
import Icon from '../../components/common/native-component/Icon';

interface Props {
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
}

export default function AddPantryFoodModal({
  modalVisible,
  setModalVisible,
}: Props) {
  const { newFood, changeFoodInfo, onAddSubmit } = useAddFood({
    initialFoodInfo: initialPantryFood,
  });

  return (
    <Modal
      title='팬트리 식료품 추가'
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      hasBackdrop
      animationIn='fadeIn'
      animationOut='fadeOut'
    >
      <View style={tw`py-6`}>
        <View style={tw`mb-1 px-6 flex-row justify-between items-center`}>
          <Text style={tw.style('text-[17px]', FontGmarketSansBold)}>
            팬트리 식료품 추가
          </Text>
          <TouchableOpacity
            style={tw`p-2`}
            onPress={() => setModalVisible(false)}
          >
            <Icon name='close' type='Ionicons' size={21} color={GRAY} />
          </TouchableOpacity>
        </View>

        <Form
          title='팬트리 식료품 추가'
          editableName={true}
          food={newFood}
          changeInfo={changeFoodInfo}
          formSteps={formTwoSteps}
        />

        <View style={tw`mx-6`}>
          <SubmitBtn
            iconName='plus'
            color='amber'
            btnName='팬트리에 추가'
            onPress={() => onAddSubmit(setModalVisible)}
          />
        </View>
      </View>
    </Modal>
  );
}
