import { View } from 'react-native';
import { Text } from '../../components/common/native-component';
import { Food } from '../../constant/foods';
import { FormLabelType, FormStep, foodForm } from '../../constant/formInfo';
import { FontGmarketSansBold } from '../../constant/fonts';
import { getFormattedDate } from '../../util';
import { useEditFood, useDeleteFood } from '../../hooks';

import InfoBox from '../../components/modal/InfoBox';
import FavoriteTagBox from '../../components/modal/FavoriteTagBox';
import SubmitBtn from '../../components/buttons/SubmitBtn';
import Modal from '../../components/modal/Modal';
import Form from '../../components/form/Form';

import CategoryImageIcon from '../../components/common/CategoryImageIcon';
import LeftDay from '../../components/common/LeftDay';
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

  const { name, category, favorite, expiredDate, purchaseDate } = editedFood;

  return (
    <Modal
      title={editing ? '식료품 정보 수정' : '식료품 상세 정보'}
      setModalVisible={setModalVisible}
      modalVisible={modalVisible}
    >
      {editing ? (
        <View>
          <Form
            title='식료품 정보 수정'
            food={editedFood}
            changeInfo={editFoodInfo}
            items={foodForm as FormLabelType[]}
            formSteps={formSteps}
          />
          <SubmitBtn
            btnName='식료품 정보 수정 완료'
            onPress={() => onEditSumbit(food.id)}
          />
        </View>
      ) : (
        <View>
          <View style={tw`my-4 px-6`}>
            <View style={tw`items-center gap-3 py-2`}>
              <View style={tw`border-t border-b border-blue-500 p-2`}>
                <Text
                  style={tw.style(
                    `text-stone-800 text-base text-center`,
                    FontGmarketSansBold
                  )}
                >
                  {name}
                </Text>
              </View>
              {favorite && <FavoriteTagBox />}
            </View>

            <InfoBox iconName='dots-grid' label='카테고리'>
              <View style={tw`flex-row items-center gap-1`}>
                <Text style={tw`text-base`}>{category}</Text>
                <CategoryImageIcon kind='icon' category={category} size={16} />
              </View>
            </InfoBox>

            <InfoBox iconName='calendar-month' label='구매날짜'>
              <Text style={tw`text-slate-800 text-base`}>
                {getFormattedDate(purchaseDate, 'YYYY년 MM월 DD일')}
              </Text>
              <LeftDay expiredDate={purchaseDate} />
            </InfoBox>

            <InfoBox iconName='calendar-month' label='유통기한'>
              <Text style={tw`text-slate-800 text-base`}>
                {getFormattedDate(expiredDate, 'YYYY년 MM월 DD일')}
              </Text>
              <LeftDay expiredDate={expiredDate} />
            </InfoBox>
          </View>

          {/* 버튼 */}
          <View style={tw`gap-1.5`}>
            <SubmitBtn
              btnName='식료품 정보 수정하기'
              onPress={() => setEditing((prev) => !prev)}
            />
            <SubmitBtn
              btnName='식료품 삭제'
              onPress={() => deleteFood(editedFood.id)}
            />
          </View>
        </View>
      )}
    </Modal>
  );
}
