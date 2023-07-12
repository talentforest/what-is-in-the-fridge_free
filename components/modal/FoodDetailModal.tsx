import { ScrollView, View } from 'react-native';
import { Food } from '../../constant/foods';
import { Text } from '../native-component';
import { INDIGO } from '../../constant/colors';
import InfoBox from './common/InfoBox';
import SubmitBtn from './form/SubmitBtn';
import useEditFood from '../../hooks/useEditFood';
import useDeleteFood from '../../hooks/useDeleteFood';
import Form from './form/Form';
import RNModal from './common/Modal';
import tw from 'twrnc';
import Icon from '../native-component/Icon';

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
        {food.image !== '' ? (
          <Text style={tw`pt-4`} fontSize={24}>
            {food.image}
          </Text>
        ) : (
          <Icon
            type='MaterialCommunityIcons'
            name='food'
            size={20}
            color={INDIGO}
          />
        )}
        <Text style={tw`text-center px-4 leading-6`}>{food.name}</Text>
      </View>

      {editing ? (
        <ScrollView style={tw`my-4`} showsVerticalScrollIndicator={false}>
          <Form
            food={editedFood}
            changeInfo={editFoodInfo}
            items={['카테고리', '구매날짜', '유통기한', '즐겨찾는 식품인가요?']}
          />
        </ScrollView>
      ) : (
        <View style={tw`my-3`}>
          <InfoBox label='카테고리' info={editedFood.category} />
          <InfoBox label='구매날짜' info={editedFood.purchaseDate} />
          <InfoBox label='유통기한' info={editedFood.expiredDate} />
          <InfoBox
            label='즐겨찾는 식품인가요?'
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
