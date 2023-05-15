import { View } from 'react-native';
import { Food } from '../../constant/foods';
import { Text } from '../native-component';
import { getLocaleDate } from '../../util';
import tw from 'twrnc';
import InfoBox from './component/InfoBox';
import SubmitBtn from '../form/SubmitBtn';
import useEditFood from '../../hooks/useEditFood';
import useDeleteFood from '../../hooks/useDeleteFood';
import FoodForm from '../form/FoodForm';
import RNModal from './component/Modal';

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
      {editing ? (
        <View style={tw`mt-4`}>
          <FoodForm food={editedFood} changeFoodInfo={editFoodInfo} />
          <SubmitBtn
            btnName='식료품 정보 수정 완료'
            onPress={() => onEditSumbit(food.id)}
          />
        </View>
      ) : (
        <>
          <View
            style={tw`w-full mt-6 gap-2 justify-center items-center rounded-lg`}
          >
            <Text styletw='text-6xl pt-4'>{food.image}</Text>
          </View>
          <View
            style={tw`my-2 rounded-2xl border border-slate-500 self-center px-3 bg-white`}
          >
            <Text styletw='text-base text-center text-indigo-700'>
              {editedFood.name}
            </Text>
          </View>
          <View style={tw`w-full mt-2 mb-6`}>
            <View style={tw`flex-row gap-0.5`}>
              <InfoBox name='카테고리' info={editedFood.category} />
              <InfoBox name='즐겨찾는 식품' favorite={editedFood.favorite} />
            </View>
            <View style={tw`flex-row gap-0.5 mt-0.5`}>
              <InfoBox
                name='구매 날짜'
                info={getLocaleDate(editedFood.purchaseDate)}
              />
              <InfoBox
                name='유통기한'
                info={getLocaleDate(editedFood.expirationDate)}
              />
            </View>
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
