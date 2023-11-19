import { formFourSteps } from '../../constant/formInfo';
import { useAddShoppingListFood } from '../../hooks';
import { Food } from '../../constant/foodInfo';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Modal from '../../components/modal/Modal';
import Form from '../../components/form/Form';
import SubmitBtn from '../../components/buttons/SubmitBtn';
import tw from 'twrnc';

interface Props {
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
  setCheckedList: (checkedList: Food[]) => void;
}

export default function AddShoppingListFoodModal({
  modalVisible,
  setModalVisible,
  setCheckedList,
}: Props) {
  const { onShoppingListFoodSubmit } = useAddShoppingListFood();

  const closeModal = () => setModalVisible(false);

  const insets = useSafeAreaInsets();

  return (
    <Modal
      title='장보기 목록 식료품 추가'
      isVisible={modalVisible}
      closeModal={closeModal}
    >
      <View style={{ paddingBottom: insets?.bottom }}>
        <View style={tw`-mx-4`}>
          <Form title='장보기 목록 식료품 추가' formSteps={formFourSteps} />
        </View>

        <SubmitBtn
          iconName='plus'
          btnName='식료품 추가하기'
          onPress={() =>
            onShoppingListFoodSubmit(setModalVisible, setCheckedList)
          }
          color='blue'
        />
      </View>
    </Modal>
  );
}
