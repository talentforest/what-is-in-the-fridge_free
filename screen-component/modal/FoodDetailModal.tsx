import { View } from 'react-native';
import { Text } from '../../components/common/native-component';
import { useSelector } from '../../redux/hook';
import { FormStep } from '../../constant/formInfo';
import { getFormattedDate } from '../../util';
import { useEditFood, useDeleteFood, useFindFood } from '../../hooks';
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
          <View style={tw`px-6 pt-4 gap-1`}>
            <View
              style={tw`gap-1.5 self-center flex-row justify-center items-center border-slate-300 mb-4 mt-2 py-1.5 px-2.5`}
            >
              <View
                style={tw`absolute top-0 left-0 border-t-2 border-l-2 rounded-tl-[3px] border-slate-400 w-4 h-3`}
              />
              <Icon
                type='MaterialCommunityIcons'
                name={!!isFavoriteItem(name) ? 'tag' : 'tag-outline'}
                size={16}
                color={!!isFavoriteItem(name) ? INDIGO : LIGHT_GRAY}
              />
              <Text
                style={tw.style(`max-w-4/5 text-stone-800`, {
                  lineHeight: 22,
                })}
              >
                {name}
              </Text>

              <View
                style={tw`absolute bottom-0 right-0 border-b-2 border-r-2 rounded-br-[3px] border-slate-400 w-4 h-3`}
              />
            </View>

            <View>
              <InfoBox iconName='grid' label='카테고리'>
                <View style={tw`flex-row items-center gap-1`}>
                  <CategoryIcon category={category} size={16} />
                  <Text>{category}</Text>
                </View>
              </InfoBox>

              <InfoBox iconName='calendar' label='소비기한'>
                <LeftDayInfoBox expiredDate={expiredDate} />
              </InfoBox>

              {purchaseDate !== '' && (
                <InfoBox iconName='calendar' label='구매날짜'>
                  <Text style={tw`text-slate-800`}>
                    {getFormattedDate(purchaseDate, 'YY.MM.DD')}
                  </Text>
                </InfoBox>
              )}

              {quantity !== '' && (
                <InfoBox iconName='bar-chart-2' label='수량'>
                  <Text style={tw``}>{comma(quantity)}</Text>
                </InfoBox>
              )}

              {memo?.length > 1 && (
                <InfoBox iconName='file-text' label='메모'>
                  <View style={tw`max-h-18`}>
                    <Text
                      numberOfLines={3}
                      ellipsizeMode='tail'
                      style={{ lineHeight: 22 }}
                    >
                      {memo}
                    </Text>
                  </View>
                </InfoBox>
              )}
            </View>

            <View style={tw`gap-1 mt-1`}>
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
