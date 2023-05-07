import { View } from 'react-native';
import { Food } from '../../constant/foods';
import { Text } from '../native-component';
import tw from 'twrnc';
import InfoBox from './component/InfoBox';
import SubmitBtn from '../form/SubmitBtn';
import useChangeFoodInfo from '../../hooks/useChangeFoodInfo';
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
    foodInfo,
    editFoodInfo,
    onEditSumbit, //
  } = useChangeFoodInfo({ food });

  return (
    <RNModal
      title='식료품 상세 정보'
      setModalVisible={setModalVisible}
      modalVisible={modalVisible}
    >
      <View
        style={tw`w-full mt-6 gap-2 justify-center items-center rounded-lg`}
      >
        <Text styletw='text-6xl pt-4'>{food.image}</Text>
      </View>
      {editing ? (
        <>
          <Text styletw='mt-2 text-base w-full'>식료품 정보 수정</Text>
          <FoodForm food={foodInfo} changeFoodInfo={editFoodInfo} />
          <SubmitBtn
            btnName='식료품 정보 수정 완료'
            onPress={() => onEditSumbit(food.id)}
          />
        </>
      ) : (
        <>
          <View
            style={tw`my-2 rounded-2xl border border-slate-500 self-center px-3 bg-white`}
          >
            <Text styletw='text-base text-center text-indigo-700'>
              {foodInfo.name}
            </Text>
          </View>
          <View style={tw`w-full mt-2 mb-6`}>
            <View style={tw`flex-row gap-0.5`}>
              <InfoBox name='카테고리' info={foodInfo.category} />
              <InfoBox name='수량' info={foodInfo.quantity} />
              <InfoBox name='즐겨찾는 식품' favorite info={foodInfo.favorite} />
            </View>
            <View style={tw`flex-row gap-0.5 mt-0.5`}>
              <InfoBox name='구매 날짜' date={foodInfo.purchaseDate} />
              <InfoBox name='유통기한' date={foodInfo.expirationDate} />
            </View>
          </View>
          <SubmitBtn
            btnName='식료품 정보 수정하기'
            onPress={() => setEditing((prev) => !prev)}
          />
          <SubmitBtn
            btnName='식료품 삭제'
            onPress={() => deleteFood(foodInfo.id)}
          />
        </>
      )}
    </RNModal>
  );
}
