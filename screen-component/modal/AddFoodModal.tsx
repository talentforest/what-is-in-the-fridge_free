import { ScrollView, View } from 'react-native';
import { FoodPosition } from '../../constant/fridgeInfo';
import { formTwoSteps } from '../../constant/formInfo';
import { useAddFood } from '../../hooks';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from '../../redux/hook';
import { scrollToEnd } from '../../util';
import { MutableRefObject } from 'react';

import Modal from '../../components/modal/Modal';
import Form from '../../components/form/Form';
import SubmitBtn from '../../components/buttons/SubmitBtn';
import tw from 'twrnc';

interface Props {
  position?: FoodPosition;
  scrollViewRef: MutableRefObject<ScrollView>;
}

export default function AddFoodModal({ position, scrollViewRef }: Props) {
  const {
    openAddFoodModal: { modalVisible },
  } = useSelector((state) => state.modalVisible);
  const { onAddSubmit, closeAddFoodModal } = useAddFood(position);

  const insets = useSafeAreaInsets();

  const scrollEnd = () => scrollToEnd(scrollViewRef);

  const onSubmitPress = () => {
    onAddSubmit();
    if (scrollEnd) {
      scrollEnd();
    }
  };

  return (
    <Modal
      title='새로운 식료품 추가'
      isVisible={modalVisible}
      closeModal={closeAddFoodModal}
    >
      <View style={{ paddingBottom: insets?.bottom }}>
        <View style={tw`-mx-4`}>
          <Form title='새로운 식료품 추가' formSteps={formTwoSteps} />
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
