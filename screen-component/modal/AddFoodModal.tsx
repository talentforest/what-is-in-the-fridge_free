import { View } from 'react-native';
import { FoodPosition } from '../../constant/fridgeInfo';
import { formThreeSteps } from '../../constant/formInfo';
import { useAddFood } from '../../hooks';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Modal from '../../components/modal/Modal';
import Form from '../../components/form/Form';
import SubmitBtn from '../../components/buttons/SubmitBtn';
import tw from 'twrnc';

interface Props {
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
  currPosition?: FoodPosition;
  scrollEnd: () => void;
}

export default function AddFoodModal({
  currPosition,
  modalVisible,
  setModalVisible,
  scrollEnd,
}: Props) {
  const { onAddSubmit, closeAddFoodModal } = useAddFood({
    setModalVisible,
    currPosition,
  });

  const insets = useSafeAreaInsets();

  const onSubmitPress = () => {
    onAddSubmit(setModalVisible, modalVisible);
    scrollEnd();
  };

  return (
    <Modal
      title='새로운 식료품 추가'
      isVisible={modalVisible}
      closeModal={closeAddFoodModal}
    >
      <View style={{ paddingBottom: insets?.bottom }}>
        <View style={tw`-mx-4`}>
          <Form title='새로운 식료품 추가' formSteps={formThreeSteps} />
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
