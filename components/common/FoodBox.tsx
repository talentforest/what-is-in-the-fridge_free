import { Animated, LayoutChangeEvent, ScrollView, View } from 'react-native';
import { Text, TouchableOpacity } from './native-component';
import {
  colorByFilter,
  cutLetter,
  getColorByLeftDay,
  getDiffDate,
  scrollTo,
} from '../../util';
import { Food } from '../../constant/foodInfo';
import { useHandleFilter, usePulseAnimation } from '../../hooks';
import { useDispatch, useSelector } from '../../redux/hook';
import { select } from '../../redux/slice/selectedFoodSlice';
import { shadowStyle } from '../../constant/shadowStyle';
import { MutableRefObject } from 'react';
import { INDIGO } from '../../constant/colors';

import CategoryIcon from './CategoryIcon';
import tw from 'twrnc';

interface Props {
  food: Food;
  setOpenFoodDetailModal: (open: boolean) => void;
  scrollViewRef?: MutableRefObject<ScrollView>;
}

export default function FoodBox({
  food,
  setOpenFoodDetailModal,
  scrollViewRef,
}: Props) {
  const { expiredDate } = food;
  const { searchedFoodName } = useSelector((state) => state.searchedFoodName);

  const { currentFilter } = useHandleFilter();

  const active = searchedFoodName === food.name;
  const { opacity, translateY } = usePulseAnimation({ active });

  const dispatch = useDispatch();

  const onItemLayout = (event: LayoutChangeEvent, food: Food) => {
    if (searchedFoodName === food.name) {
      const { y } = event.nativeEvent.layout;
      scrollTo(scrollViewRef, 0, y);
    }
    return null;
  };

  const onPress = () => {
    dispatch(select(food));
    setOpenFoodDetailModal(true);
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={tw.style(`rounded-lg bg-white`, shadowStyle(3))}
      onLayout={(event: LayoutChangeEvent) => onItemLayout(event, food)}
    >
      <Animated.View
        style={tw.style(`rounded-lg`, {
          borderRadius: 8,
          backgroundColor: active ? INDIGO : '#fff',
          transform: [{ translateY }],
          opacity,
        })}
      >
        <View
          style={tw.style(`border border-slate-300 gap-1 rounded-lg justify-center items-center flex-row px-3 py-0.8 
          ${colorByFilter(currentFilter, expiredDate, 'bg')} 
          ${active ? 'border-indigo-300' : ''}`)}
        >
          {getDiffDate(expiredDate) <= 7 && (
            <View
              style={tw`w-1.7 aspect-square rounded-full absolute top-0.5 right-0.5
              border-${getColorByLeftDay(expiredDate)}-500 border
              bg-${getColorByLeftDay(expiredDate)}-400`}
            />
          )}

          <CategoryIcon category={food.category} size={14} />

          <Text
            style={tw`${colorByFilter(currentFilter, expiredDate, 'text')} 
            ${active ? 'text-indigo-600' : ''} text-center`}
          >
            {cutLetter(food.name, 9)}
          </Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}
