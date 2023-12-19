import { View } from 'react-native';
import { Text, TouchableOpacity } from '../common/native-component';
import { getFormattedDate } from '../../util';
import { comma } from '../../util/commaNotation';
import { useDispatch, useSelector } from '../../redux/hook';
import { BLUE, ORANGE_RED } from '../../constant/colors';
import { shadowStyle } from '../../constant/shadowStyle';
import { handleQuantityPantryFood } from '../../redux/slice/food-list/pantryFoodsSlice';
import { handleQuantityFridgeFood } from '../../redux/slice/food-list/fridgeFoodsSlice';
import { editFormFood } from '../../redux/slice/food/formFoodSlice';

import InfoBox from './InfoBox';
import LeftDayInfoBox from '../modal/LeftDayInfoBox';
import CategoryIcon from '../common/CategoryIcon';
import FoodDetailName from './FoodDetailName';
import Icon from '../common/native-component/Icon';
import tw from 'twrnc';

export default function FoodDetail() {
  const { formFood } = useSelector((state) => state.formFood);

  const {
    name,
    category,
    quantity,
    expiredDate,
    purchaseDate,
    memo,
    id,
    space,
  } = formFood;

  const dispatch = useDispatch();

  const onHandleCountPress = (direction: string) => {
    if (direction === 'down' && quantity === '1') return;

    const handleCount = direction === 'up' ? 1 : -1;

    const newQuantity = `${+quantity + handleCount}`;

    const newInfo = { id, quantity: newQuantity };

    dispatch(editFormFood({ quantity: newQuantity }));

    dispatch(
      space === '팬트리'
        ? handleQuantityPantryFood(newInfo)
        : handleQuantityFridgeFood(newInfo)
    );
  };

  return (
    <>
      <FoodDetailName name={name} />

      <View>
        <InfoBox iconName='apps' label='카테고리'>
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
          <InfoBox iconName='diff' label='수량'>
            <View style={tw`flex-row items-center justify-between gap-2`}>
              <Text>{comma(quantity)}</Text>
              <View style={tw`flex-row items-center gap-2`}>
                {['up', 'down'].map((direction) => (
                  <TouchableOpacity
                    key={direction}
                    onPress={() => onHandleCountPress(direction)}
                    style={tw.style(
                      `border border-slate-200 bg-white items-center justify-center rounded-xl w-6.5 aspect-square`,
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

        {memo?.length >= 1 && (
          <InfoBox iconName='note' label='메모'>
            <View style={tw`max-h-18`}>
              <Text
                numberOfLines={3}
                ellipsizeMode='tail'
                style={tw`leading-5`}
              >
                {memo}
              </Text>
            </View>
          </InfoBox>
        )}
      </View>
    </>
  );
}
