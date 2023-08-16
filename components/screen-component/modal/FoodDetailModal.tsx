import { View } from 'react-native';
import { Text } from '../../native-component';
import { Food } from '../../../constant/foods';
import { FormLabel, FormStep, foodForm } from '../../../constant/formInfo';
import { FontGmarketSansBold } from '../../../constant/fonts';
import InfoBox from '../../common/modal/InfoBox';
import FavoriteTagBox from '../../common/boxes/FavoriteTagBox';
import SubmitBtn from '../../common/form/SubmitBtn';
import RNModal from '../../common/modal/Modal';
import Form from '../../common/form/Form';
import useEditFood from '../../../hooks/useEditFood';
import useDeleteFood from '../../../hooks/useDeleteFood';
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
        <View>
          <Form
            food={editedFood}
            changeInfo={editFoodInfo}
            items={foodForm as FormLabel[]}
            formSteps={formSteps}
          />
          <SubmitBtn
            btnName='식료품 정보 수정 완료'
            onPress={() => onEditSumbit(food.id)}
          />
        </View>
      ) : (
        <>
          <View style={tw`my-3 px-2`}>
            <View style={tw`items-center gap-3 mb-2 py-2`}>
              <View>
                <Text
                  style={tw.style(`text-stone-700`, FontGmarketSansBold)}
                  fontSize={16}
                >
                  {editedFood.name}
                </Text>
              </View>
              {editedFood.favorite && <FavoriteTagBox />}
            </View>
            <InfoBox
              iconName='dots-grid'
              label='카테고리'
              info={editedFood.category}
            />
            <InfoBox
              iconName='calendar-month'
              label='구매날짜'
              info={editedFood.purchaseDate}
            />
            <InfoBox
              iconName='calendar-month'
              label='유통기한'
              info={editedFood.expiredDate}
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
