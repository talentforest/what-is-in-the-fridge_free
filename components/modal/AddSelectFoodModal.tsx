import { useRoute } from '@react-navigation/native';
import { FormStep } from '../../constant/formInfo';
import RNModal from './common/Modal';
import Form from './form/Form';
import useAddSelectFood from '../../hooks/useAddSelectFood';
import SubmitBtn from './form/SubmitBtn';

interface Props {
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
  formSteps: FormStep[];
}

export default function AddSelectFoodModal({
  modalVisible,
  setModalVisible,
  formSteps,
}: Props) {
  const { selectedFood, onChange, onSubmit } = useAddSelectFood();
  const route = useRoute();

  return (
    <RNModal
      title='식료품 추가'
      setModalVisible={setModalVisible}
      modalVisible={modalVisible}
    >
      <Form
        editableName={false}
        items={[
          route.name !== 'FavoriteFoods' && '아이콘과 이름',
          '카테고리',
          '냉장고 위치 선택',
          '구매날짜',
          '유통기한',
          route.name !== 'FavoriteFoods' && '자주 먹는 식품인가요?',
        ]}
        food={selectedFood}
        changeInfo={onChange}
        formSteps={formSteps}
      />
      <SubmitBtn
        btnName='식료품 정보 추가하기'
        onPress={() => {
          onSubmit();
          setModalVisible(false);
        }}
      />
    </RNModal>
  );
}
