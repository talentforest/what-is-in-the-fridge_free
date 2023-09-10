import { FormStep } from '../../constant/formInfo';
import { useAddSelectFood } from '../../hooks';
import { Food } from '../../constant/foodInfo';
import { View } from 'react-native';

import Modal from '../../components/modal/Modal';
import Form from '../../components/form/Form';
import SubmitBtn from '../../components/buttons/SubmitBtn';
import tw from 'twrnc';

interface Props {
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
  formSteps: FormStep[];
  setCheckedList: (checkedList: Food[]) => void;
}

export default function AddSelectFoodModal({
  modalVisible,
  setModalVisible,
  formSteps,
  setCheckedList,
}: Props) {
  const { selectedFood, onChange, onSubmit } = useAddSelectFood();

  return (
    <Modal
      title='장보기 목록 식료품 추가'
      setModalVisible={setModalVisible}
      modalVisible={modalVisible}
    >
      <Form
        title='장보기 목록 식료품 추가'
        food={selectedFood}
        changeInfo={onChange}
        formSteps={formSteps}
      />

      <View style={tw`mx-6`}>
        <SubmitBtn
          btnName='식료품 추가하기'
          onPress={() => onSubmit(setModalVisible, setCheckedList)}
          iconName='plus'
          color='blue'
        />
      </View>
    </Modal>
  );
}
