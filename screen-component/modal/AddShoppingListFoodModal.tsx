import { formThreeSteps } from '../../constant/formInfo';
import { useAddShoppingListFood } from '../../hooks';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from '../../redux/hook';

import Modal from '../../components/modal/Modal';
import Form from '../../components/form/Form';
import SubmitBtn from '../../components/buttons/SubmitBtn';
import tw from 'twrnc';

export default function AddShoppingListFoodModal() {
  const { formModal } = useSelector((state) => state.modalVisible);

  const { onShoppingListFoodSubmit, closeFormModal } = useAddShoppingListFood();

  const insets = useSafeAreaInsets();

  return (
    <Modal
      title='장보기 목록 식료품 추가'
      isVisible={formModal}
      closeModal={closeFormModal}
    >
      <View style={{ paddingBottom: insets?.bottom }}>
        <View style={tw`-mx-4`}>
          <Form title='장보기 목록 식료품 추가' formSteps={formThreeSteps} />
        </View>

        <SubmitBtn
          iconName='plus'
          btnName='식료품 추가하기'
          onPress={onShoppingListFoodSubmit}
          color='blue'
        />
      </View>
    </Modal>
  );
}
