import { View } from 'react-native';
import { Text } from '../../components/common/native-component';
import { useSelector } from '../../redux/hook';
import { FormStep } from '../../constant/formInfo';
import { FontGmarketSansBold } from '../../constant/fonts';
import { getFormattedDate, getRelativeTime } from '../../util';
import { useEditFood, useDeleteFridgeFood, useFindFood } from '../../hooks';

import InfoBox from '../../components/modal/InfoBox';
import FavoriteTagBox from '../../components/modal/FavoriteTagBox';
import SubmitBtn from '../../components/buttons/SubmitBtn';
import Modal from '../../components/modal/Modal';
import Form from '../../components/form/Form';
import CategoryImageIcon from '../../components/common/CategoryImageIcon';
import LeftDayInfoBox from '../../components/modal/LeftDayInfoBox';
import tw from 'twrnc';

interface Props {
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
  formSteps: FormStep[];
}

export default function FoodDetailModal({
  modalVisible,
  setModalVisible,
  formSteps,
}: Props) {
  const { selectedFood: food } = useSelector((state) => state.selectedFood);

  const { deleteFood } = useDeleteFridgeFood({
    space: food.space,
    setModalVisible,
  });

  const {
    editing,
    setEditing,
    editedFood,
    editFoodInfo,
    onEditSumbit, //
  } = useEditFood({ food });

  const { isFavoriteItem } = useFindFood();

  const { name, category, expiredDate, purchaseDate } = editedFood;

  return (
    <Modal
      title={editing ? '식료품 정보 수정' : '식료품 상세 정보'}
      setModalVisible={setModalVisible}
      modalVisible={modalVisible}
      hasBackdrop
    >
      {editing ? (
        <View>
          <Form
            title='식료품 정보 수정'
            food={editedFood}
            changeInfo={editFoodInfo}
            formSteps={formSteps}
          />
          <View style={tw`mx-6 mt-2`}>
            <SubmitBtn
              color='blue'
              iconName='checkbox-marked-outline'
              btnName='식료품 정보 수정 완료'
              onPress={() => onEditSumbit(food.id)}
            />
          </View>
        </View>
      ) : (
        <View style={tw`mt-6 px-6 gap-2`}>
          <View
            style={tw`self-center flex-row items-center border-t border-b border-blue-500 py-1.5 px-4`}
          >
            <Text
              style={tw.style(
                `text-stone-800 text-base text-center`,
                FontGmarketSansBold
              )}
            >
              {name}
            </Text>
          </View>

          {!!isFavoriteItem(food.name) && (
            <View style={tw`self-center mb-2`}>
              <FavoriteTagBox />
            </View>
          )}

          <View>
            <InfoBox iconName='dots-grid' label='카테고리'>
              <View style={tw`flex-row items-center gap-1`}>
                <Text style={tw`text-base`}>{category}</Text>
                <CategoryImageIcon kind='icon' category={category} size={16} />
              </View>
            </InfoBox>

            <InfoBox iconName='calendar-month' label='유통기한'>
              <LeftDayInfoBox expiredDate={expiredDate} />
            </InfoBox>

            {purchaseDate !== '' && (
              <InfoBox iconName='calendar-month' label='구매날짜'>
                <View>
                  <Text style={tw`text-slate-800 text-base`}>
                    {getFormattedDate(purchaseDate, 'YYYY년 MM월 DD일')}
                  </Text>
                  <Text style={tw`text-[13px] -mt-1 text-blue-600`}>
                    {getRelativeTime(purchaseDate)}
                  </Text>
                </View>
              </InfoBox>
            )}
          </View>

          <View style={tw`gap-2`}>
            <SubmitBtn
              color='blue'
              iconName='pencil'
              btnName='식료품 정보 수정'
              onPress={() => setEditing((prev) => !prev)}
            />
            <SubmitBtn
              color='amber'
              iconName='trash-can'
              btnName={`${food.compartmentNum}칸에서 식료품 삭제`}
              onPress={() => deleteFood(editedFood.id)}
            />
          </View>
        </View>
      )}
    </Modal>
  );
}
