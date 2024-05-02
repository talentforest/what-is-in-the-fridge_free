import { ScrollView, View } from 'react-native';
import { FoodPosition } from '../../constant/fridgeInfo';
import { formThreeSteps } from '../../constant/formInfo';
import { useAddFood } from '../../hooks';
import { useSelector } from '../../redux/hook';
import { scrollToEnd } from '../../util';
import { MutableRefObject } from 'react';

import FadeInMiddleModal from '../../components/modal/FadeInMiddleModal';
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

  const scrollEnd = () => scrollToEnd(scrollViewRef);

  const onSubmitPress = () => {
    onAddSubmit();
    if (scrollEnd) {
      scrollEnd();
    }
  };

  return (
    <FadeInMiddleModal
      title='새로운 식료품 추가'
      isVisible={modalVisible}
      closeModal={closeAddFoodModal}
    >
      <View style={tw`-mx-4 h-90`}>
        <Form title='새로운 식료품 추가' formSteps={formThreeSteps} />
      </View>

      <SubmitBtn
        iconName='plus'
        color='blue'
        btnName='식료품 추가하기'
        onPress={onSubmitPress}
      />
    </FadeInMiddleModal>
  );
}
