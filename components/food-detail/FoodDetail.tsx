import { View } from 'react-native';
import { Text, TouchableOpacity } from '../common/native-component';
import { getFormattedDate } from '../../util';
import { comma } from '../../util/commaNotation';
import { useDispatch, useSelector } from '../../redux/hook';
import {
  BLUE,
  GRAY,
  INDIGO,
  LIGHT_GRAY,
  MEDIUM_INDIGO,
  ORANGE_RED,
} from '../../constant/colors';
import { shadowStyle } from '../../constant/shadowStyle';
import {
  addToPantry,
  editPantryFood,
  handleQuantityPantryFood,
  removePantryFood,
} from '../../redux/slice/food-list/pantryFoodsSlice';
import {
  addFridgeFood,
  editFridgeFood,
  handleQuantityFridgeFood,
  removeFridgeFood,
} from '../../redux/slice/food-list/fridgeFoodsSlice';
import {
  editFormFood,
  setFormFood,
} from '../../redux/slice/food/formFoodSlice';
import {
  showOpenFoodDetailModal,
  showOpenFoodPositionModal,
} from '../../redux/slice/modalVisibleSlice';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { search } from '../../redux/slice/food/searchedFoodSlice';
import { useHandleAlert } from '../../hooks';
import {
  checkSameStorage,
  isFridgeFood,
  isPantryFood,
} from '../../util/checkFoodSpace';

import InfoBox from './InfoBox';
import LeftDayInfoBox from '../modal/LeftDayInfoBox';
import CategoryIcon from '../common/CategoryIcon';
import FoodDetailName from './FoodDetailName';
import Icon from '../common/native-component/Icon';
import FadeInMiddleModal from '../modal/FadeInMiddleModal';
import SubmitBtn from '../buttons/SubmitBtn';
import SpaceItem from '../form/SpaceItem';
import tw from 'twrnc';

export default function FoodDetail() {
  const { openFoodPositionModal } = useSelector((state) => state.modalVisible);
  const { formFood, originFood } = useSelector((state) => state.formFood);

  const insets = useSafeAreaInsets();

  const dispatch = useDispatch();

  const onHandleCountPress = (direction: string) => {
    if (direction === 'down' && formFood.quantity === '1') return;

    const handleCount = direction === 'up' ? 1 : -1;

    const newQuantity = `${+formFood.quantity + handleCount}`;

    const newInfo = { id: formFood.id, quantity: newQuantity };

    dispatch(editFormFood({ quantity: newQuantity }));

    dispatch(
      formFood.space === '실온보관'
        ? handleQuantityPantryFood(newInfo)
        : handleQuantityFridgeFood(newInfo)
    );
  };

  const onOpenFoodPostionPress = () => {
    dispatch(showOpenFoodPositionModal(true));
  };

  const { alertWithFood, setAlert } = useHandleAlert();

  const afterChangedPositionAlert = () => {
    const { alertMoveStorage } = alertWithFood(formFood);
    setAlert(alertMoveStorage);
  };

  const onFoodPositionSubmit = () => {
    const { space: newSpace, id } = formFood;
    const { space: originSpace, compartmentNum: originCompartmentNum } =
      originFood;

    const compareStorage = checkSameStorage(originSpace, newSpace);

    if (compareStorage) {
      dispatch(
        originSpace === '실온보관'
          ? editPantryFood({ id, food: formFood })
          : editFridgeFood({ id, food: formFood })
      );
    }

    if (!compareStorage) {
      if (isPantryFood(newSpace)) {
        dispatch(removeFridgeFood(id));
        dispatch(addToPantry(formFood));
      }
      if (isFridgeFood(newSpace)) {
        dispatch(removePantryFood(id));
        dispatch(addFridgeFood(formFood));
      }
    }

    dispatch(showOpenFoodDetailModal(false));
    dispatch(showOpenFoodPositionModal(false));

    const sameSpace = originSpace === newSpace;
    const sameCompartmentNum =
      formFood?.compartmentNum === originCompartmentNum;

    //
    if (sameSpace && !sameCompartmentNum) {
      dispatch(search(formFood.name));
    }
    if (!sameSpace) {
      afterChangedPositionAlert();
    }
  };

  return (
    <>
      <View style={tw`py-5`}>
        <TouchableOpacity
          onPress={onOpenFoodPostionPress}
          style={tw.style(
            `flex-row absolute border border-slate-50 bg-white pl-1.5 pr-2 py-1.5 rounded-xl right-0 gap-1 items-center justify-center`,
            shadowStyle(2)
          )}
        >
          <Icon
            name='location'
            type='Octicons'
            size={11}
            color={MEDIUM_INDIGO}
          />
          <Text fontSize={14} style={tw`text-indigo-400 mt-0.3`}>
            위치 변경
          </Text>
        </TouchableOpacity>

        <FoodDetailName name={formFood.name} />
      </View>

      <View>
        <InfoBox iconName='apps' label='카테고리'>
          <View style={tw`flex-row items-center gap-1`}>
            <CategoryIcon category={formFood.category} size={16} />
            <Text>{formFood.category}</Text>
          </View>
        </InfoBox>

        {formFood.expiredDate !== '' && (
          <InfoBox iconName='calendar' label='소비기한'>
            <LeftDayInfoBox expiredDate={formFood.expiredDate} />
          </InfoBox>
        )}

        {formFood.purchaseDate !== '' && (
          <InfoBox iconName='calendar' label='구매날짜'>
            <Text style={tw`text-slate-800`}>
              {getFormattedDate(formFood.purchaseDate, 'YY.MM.DD')}
            </Text>
          </InfoBox>
        )}

        {formFood.quantity !== '' && (
          <InfoBox iconName='diff' label='수량'>
            <View style={tw`flex-row items-center justify-between gap-2`}>
              <Text>{comma(formFood.quantity)}</Text>
              <View style={tw`flex-row items-center gap-2`}>
                {['up', 'down'].map((direction) => (
                  <TouchableOpacity
                    key={direction}
                    onPress={() => onHandleCountPress(direction)}
                    style={tw.style(
                      `border border-slate-200 bg-white items-center justify-center rounded-xl w-6 aspect-square`,
                      shadowStyle(3)
                    )}
                  >
                    <Icon
                      name={`triangle-${direction}`}
                      type='Octicons'
                      size={18}
                      color={direction === 'up' ? BLUE : ORANGE_RED}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </InfoBox>
        )}

        {formFood.memo?.length >= 1 && (
          <InfoBox iconName='note' label='메모'>
            <View style={tw`max-h-16`}>
              <Text
                numberOfLines={3}
                ellipsizeMode='tail'
                style={tw`leading-5`}
              >
                {formFood.memo}
              </Text>
            </View>
          </InfoBox>
        )}
      </View>

      <FadeInMiddleModal
        isVisible={openFoodPositionModal}
        closeModal={() => {
          dispatch(showOpenFoodPositionModal(false));
          dispatch(setFormFood(originFood));
        }}
        title='식료품 위치 수정'
      >
        <View style={{ gap: 8 }}>
          <SpaceItem label={'식료품 위치 수정'} />

          <SubmitBtn
            color='blue'
            iconName='check'
            btnName='위치 수정 완료'
            onPress={onFoodPositionSubmit}
          />
        </View>
      </FadeInMiddleModal>
    </>
  );
}
