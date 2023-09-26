import { View } from 'react-native';
import { Text } from '../../components/common/native-component';
import { useSelector } from '../../redux/hook';
import { FormStep } from '../../constant/formInfo';
import { FontGmarketSansBold } from '../../constant/fonts';
import { cutLetter, getFormattedDate } from '../../util';
import { useEditFood, useDeleteFood, useFindFood } from '../../hooks';
import { INDIGO, LIGHT_GRAY } from '../../constant/colors';

import InfoBox from '../../components/modal/InfoBox';
import SubmitBtn from '../../components/buttons/SubmitBtn';
import Modal from '../../components/modal/Modal';
import Form from '../../components/form/Form';
import CategoryImageIcon from '../../components/common/CategoryImageIcon';
import LeftDayInfoBox from '../../components/modal/LeftDayInfoBox';
import Icon from '../../components/common/native-component/Icon';
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
  const { selectedFood } = useSelector((state) => state.selectedFood);

  const { deleteFood } = useDeleteFood({
    space: selectedFood.space,
    setModalVisible,
  });

  const {
    editing,
    setEditing,
    editedFood,
    editFoodInfo,
    onEditSumbit, //
  } = useEditFood({ food: selectedFood });

  const { id, name, category, expiredDate, purchaseDate, quantity, memo } =
    editedFood;

  const { isFavoriteItem } = useFindFood();

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
              onPress={() => onEditSumbit(id)}
            />
          </View>
        </View>
      ) : (
        <View style={tw`mt-6 px-6 gap-2`}>
          <View
            style={tw`gap-2 self-center flex-row justify-center items-center border-t border-b border-slate-300 mb-4 mt-2 py-2 px-4`}
          >
            <Icon
              type='MaterialCommunityIcons'
              name='tag-heart'
              size={18}
              color={!!isFavoriteItem(name) ? INDIGO : LIGHT_GRAY}
            />
            <Text
              style={tw.style(
                `text-stone-800 text-base text-center`,
                FontGmarketSansBold
              )}
            >
              {name}
            </Text>
          </View>

          <View>
            <InfoBox iconName='dots-grid' label='카테고리'>
              <View style={tw`flex-row items-center gap-1`}>
                <Text style={tw`text-[15px]`}>{category}</Text>
                <CategoryImageIcon kind='icon' category={category} size={16} />
              </View>
            </InfoBox>

            <InfoBox iconName='calendar-month' label='유통기한'>
              <LeftDayInfoBox expiredDate={expiredDate} />
            </InfoBox>

            {purchaseDate !== '' && (
              <InfoBox iconName='calendar-month' label='구매날짜'>
                <Text style={tw`text-slate-800 text-[15px]`}>
                  {getFormattedDate(purchaseDate, 'YYYY년 MM월 DD일')}
                </Text>
              </InfoBox>
            )}

            {quantity !== '' && (
              <InfoBox iconName='numeric-1-box-outline' label='수량'>
                <Text style={tw`text-[15px]`}>{quantity}</Text>
              </InfoBox>
            )}

            {memo?.length > 1 && (
              <InfoBox iconName='note-text-outline' label='메모'>
                <View style={tw`max-h-12`}>
                  <Text style={tw.style(`text-[15px]`, { lineHeight: 22 })}>
                    {cutLetter(memo, 31)}
                  </Text>
                </View>
              </InfoBox>
            )}
          </View>

          <View style={tw`gap-2 mt-3`}>
            <SubmitBtn
              color='blue'
              iconName='pencil'
              btnName='식료품 정보 수정'
              onPress={() => setEditing((prev) => !prev)}
            />
            <SubmitBtn
              color='amber'
              iconName='trash-can'
              btnName={`${
                selectedFood?.compartmentNum
                  ? `${selectedFood.compartmentNum}칸`
                  : '팬트리'
              }에서 식료품 삭제`}
              onPress={() => deleteFood(editedFood.id)}
            />
          </View>
        </View>
      )}
    </Modal>
  );
}
