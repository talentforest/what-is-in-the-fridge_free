import { Image, View } from 'react-native';
import { Food } from '../../constant/foods';
import { Text } from '../native-component';
import { getLeftDays, getLocaleDate } from '../../util';
import tw from 'twrnc';
import InfoBox from './common/InfoBox';
import SubmitBtn from './form/SubmitBtn';
import useEditFood from '../../hooks/useEditFood';
import useDeleteFood from '../../hooks/useDeleteFood';
import Form from './form/Form';
import RNModal from './common/Modal';

interface Props {
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
  food: Food;
}

export default function FoodDetailModal({
  modalVisible,
  setModalVisible,
  food,
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
      setModalVisible={setModalVisible}
      modalVisible={modalVisible}
    >
      <View style={tw`items-center mt-4 gap-2 mb-2`}>
        {food.image.includes('http') ? (
          <Image
            style={tw`h-20 w-20 rounded-md`}
            source={{ uri: food.image }}
          />
        ) : (
          <Text styletw='text-6xl pt-4'>{food.image}</Text>
        )}
        <Text styletw='text-center px-4 leading-6'>{food.name}</Text>
      </View>
      {editing ? (
        <View>
          <View style={tw`mt-3 mb-8 gap-4`}>
            <Form
              food={editedFood}
              changeInfo={editFoodInfo}
              items={['구매날짜', '유통기한', '즐겨찾는 식품인가요?']}
            />
          </View>
          <SubmitBtn
            btnName='식료품 정보 수정 완료'
            onPress={() => onEditSumbit(food.id)}
          />
        </View>
      ) : (
        <>
          <View style={tw`my-3`}>
            <InfoBox label='카테고리' info={editedFood.category} />
            <InfoBox
              label='구매날짜'
              info={getLocaleDate(editedFood.purchaseDate)}
              leftDays={getLeftDays(editedFood.purchaseDate)}
            />
            <InfoBox
              label='유통기한'
              info={getLocaleDate(editedFood.expiredDate)}
              leftDays={getLeftDays(editedFood.expiredDate)}
            />
            <InfoBox
              label='즐겨찾는 식품인가요?'
              favorite={editedFood.favorite}
            />
          </View>
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
