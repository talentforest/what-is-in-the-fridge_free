import { formFourSteps, formThreeSteps } from '../../constant/formInfo';
import { useAddShoppingListFood } from '../../hooks';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from '../../redux/hook';

import FadeInMiddleModal from '../../components/modal/FadeInMiddleModal';
import Form from '../../components/form/Form';
import SubmitBtn from '../../components/buttons/SubmitBtn';
import tw from 'twrnc';

export default function AddShoppingListFoodModal() {
  const { formModal } = useSelector((state) => state.modalVisible);

  const { onShoppingListFoodSubmit, closeFormModal } = useAddShoppingListFood();

  const insets = useSafeAreaInsets();

  return (
    <FadeInMiddleModal
      title='장보기 목록 식료품 추가'
      isVisible={formModal}
      closeModal={closeFormModal}
    >
      <View style={tw`-mx-4`}>
        <Form title='장보기 목록 식료품 추가' formSteps={formFourSteps} />
      </View>

      <SubmitBtn
        iconName='plus'
        btnName='식료품 추가하기'
        onPress={onShoppingListFoodSubmit}
        color='blue'
      />
    </FadeInMiddleModal>
  );
}
