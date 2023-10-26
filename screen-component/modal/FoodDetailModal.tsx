import { View } from 'react-native';
import { Text } from '../../components/common/native-component';
import { useSelector } from '../../redux/hook';
import { FormStep } from '../../constant/formInfo';
import { SCDream5 } from '../../constant/fonts';
import { getFormattedDate } from '../../util';
import {
  useEditFood,
  useDeleteFood,
  useFindFood,
  useSlideAnimation,
} from '../../hooks';
import { INDIGO, LIGHT_GRAY } from '../../constant/colors';
import { comma } from '../../util/commaNotation';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import InfoBox from '../../components/modal/InfoBox';
import SubmitBtn from '../../components/buttons/SubmitBtn';
import Modal from '../../components/modal/Modal';
import Form from '../../components/form/Form';
import LeftDayInfoBox from '../../components/modal/LeftDayInfoBox';
import Icon from '../../components/common/native-component/Icon';
import CategoryIcon from '../../components/common/CategoryIcon';
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

  const {
    editing,
    setEditing,
    editedFood,
    setEditedFood,
    editFoodInfo,
    onEditSumbit, //
  } = useEditFood();

  const {
    name,
    space,
    category,
    expiredDate,
    purchaseDate,
    quantity,
    memo, //
  } = editedFood;

  const insets = useSafeAreaInsets();

  const { deleteFood } = useDeleteFood({ space, setModalVisible });

  const { isFavoriteItem } = useFindFood();

  const { height } = useSlideAnimation({
    initialValue: 200,
    toValue: 400,
    active: editing,
  });

  const closeModal = () => {
    if (editing) {
      setEditedFood(selectedFood);
      setEditing(false);
    }
    setModalVisible(false);
  };

  return (
    <Modal
      title={editing ? '식료품 정보 수정' : '식료품 상세 정보'}
      closeModal={closeModal}
      isVisible={modalVisible}
    >
      <View
        style={tw.style(`${editing ? 'bg-stone-100' : 'bg-white'}`, {
          paddingBottom: insets?.bottom + 12,
        })}
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
                iconName='check-square'
                btnName='식료품 정보 수정 완료'
                onPress={() => onEditSumbit(setModalVisible)}
              />
            </View>
          </View>
        ) : (
          <View style={tw`px-6 pt-6 gap-2`}>
            <View
              style={tw`gap-2 self-center flex-row justify-center items-center border-t border-b border-slate-300 mb-4 mt-2 py-2 px-4`}
            >
              <Icon
                type='MaterialCommunityIcons'
                name='tag-heart'
                size={18}
                color={!!isFavoriteItem(name) ? INDIGO : LIGHT_GRAY}
              />
              <Text style={tw.style(`text-stone-800`, SCDream5)}>{name}</Text>
            </View>

            <View>
              <InfoBox iconName='dots-grid' label='카테고리'>
                <View style={tw`flex-row items-center gap-1`}>
                  <CategoryIcon category={category} size={16} />
                  <Text style={tw`text-[15px]`}>{category}</Text>
                </View>
              </InfoBox>

              <InfoBox iconName='calendar' label='소비기한'>
                <LeftDayInfoBox expiredDate={expiredDate} />
              </InfoBox>

              {purchaseDate !== '' && (
                <InfoBox iconName='calendar' label='구매날짜'>
                  <Text style={tw`text-slate-800 text-[15px]`}>
                    {getFormattedDate(purchaseDate, 'YY년 MM월 DD일')}
                  </Text>
                </InfoBox>
              )}

              {quantity !== '' && (
                <InfoBox iconName='sort-numeric-ascending' label='수량'>
                  <Text style={tw`text-[15px]`}>{comma(quantity)}</Text>
                </InfoBox>
              )}

              {memo?.length > 1 && (
                <InfoBox iconName='note-text-outline' label='메모'>
                  <View style={tw`max-h-12`}>
                    <Text
                      numberOfLines={3}
                      ellipsizeMode='tail'
                      style={tw.style(`text-[15px]`, {
                        lineHeight: 22,
                      })}
                    >
                      {memo}
                    </Text>
                  </View>
                </InfoBox>
              )}
            </View>

            <View style={tw`gap-1 mt-3`}>
              <SubmitBtn
                color='blue'
                iconName='edit'
                btnName='식료품 정보 수정'
                onPress={() => setEditing((prev) => !prev)}
              />
              <SubmitBtn
                color='gray'
                iconName='trash-2'
                btnName={`${
                  space === '팬트리' ? '팬트리에서' : '냉장고에서'
                } 식료품 삭제`}
                onPress={() => deleteFood(editedFood.id)}
              />
            </View>
          </View>
        )}
      </View>
    </Modal>
  );
}
