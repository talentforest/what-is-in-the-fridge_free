import { View } from 'react-native';
import { Food } from '../../../constant/foods';
import { FormStep } from '../../../constant/formInfo';
import InfoBox from '../../common/modal/InfoBox';
import SubmitBtn from '../../common/form/SubmitBtn';
import useEditFood from '../../../hooks/useEditFood';
import useDeleteFood from '../../../hooks/useDeleteFood';
import Form from '../../common/form/Form';
import RNModal from '../../common/modal/Modal';
import tw from 'twrnc';

interface Props {
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
  food: Food;
  formSteps: FormStep[];
}

export default function FoodDetailModal({
  modalVisible,
  setModalVisible,
  food,
  formSteps,
}: Props) {
  const { deleteFood } = useDeleteFood({ space: food.space, setModalVisible });
  const {
    editing,
    setEditing,
    editedFood,
    editFoodInfo,
    onEditSumbit, //
  } = useEditFood({ food });

  return (
    <RNModal
      title={editing ? '식료품 정보 수정' : '식료품 상세 정보'}
      bgColor={editing ? 'bg-blue-50' : 'bg-white'}
      setModalVisible={setModalVisible}
      modalVisible={modalVisible}
    >
      {editing ? (
        <Form
          food={editedFood}
          changeInfo={editFoodInfo}
          items={[
            '이름',
            '카테고리',
            '구매날짜',
            '유통기한',
            '자주 먹는 식품인가요?',
          ]}
          formSteps={formSteps}
        />
      ) : (
        <View style={tw`my-3`}>
          <InfoBox label='이름' info={food.name} />
          <InfoBox label='카테고리' info={editedFood.category} />
          <InfoBox label='구매날짜' info={editedFood.purchaseDate} />
          <InfoBox label='유통기한' info={editedFood.expiredDate} />
          <InfoBox
            label='자주 먹는 식품인가요?'
            favorite={editedFood.favorite}
          />
        </View>
      )}

      {editing ? (
        <SubmitBtn
          btnName='식료품 정보 수정 완료'
          onPress={() => onEditSumbit(food.id)}
        />
      ) : (
        <>
          <SubmitBtn
            btnName='식료품 정보 수정하기'
            onPress={() => setEditing((prev) => !prev)}
          />
          <SubmitBtn
            btnName='식료품 삭제'
            onPress={() => deleteFood(editedFood.id)}
          />
        </>
      )}
    </RNModal>
  );
}
