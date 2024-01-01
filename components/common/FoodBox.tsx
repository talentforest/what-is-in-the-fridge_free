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
import { MutableRefObject } from 'react';
import { INDIGO } from '../../constant/colors';
import {
  saveOriginFood,
  setFormFood,
} from '../../redux/slice/food/formFoodSlice';
import { shadowStyle } from '../../constant/shadowStyle';
import { showOpenFoodDetailModal } from '../../redux/slice/modalVisibleSlice';

import CategoryIcon from './CategoryIcon';
import tw from 'twrnc';

interface Props {
  food: Food;
  scrollViewRef?: MutableRefObject<ScrollView>;
}

export default function FoodBox({ food, scrollViewRef }: Props) {
  const {
    expandCompartmentModal: { modalVisible },
  } = useSelector((state) => state.modalVisible);
  const { expiredDate } = food;
  const { searchedFoodName } = useSelector((state) => state.searchedFoodName);

  const { currentFilter } = useHandleFilter();

  const active = searchedFoodName === food.name;
  const { opacity, translateY } = usePulseAnimation({ active });

  const dispatch = useDispatch();

  const onItemLayout = (event: LayoutChangeEvent) => {
    if (active) {
      const { y } = event.nativeEvent.layout;
      scrollTo(scrollViewRef, 0, y);
    }
    return null;
  };

  const onPress = () => {
    dispatch(setFormFood(food));
    dispatch(saveOriginFood(food));
    dispatch(showOpenFoodDetailModal(true));
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      onLayout={(event: LayoutChangeEvent) => onItemLayout(event)}
    >
      <Animated.View
        style={tw.style(`rounded-lg`, {
          borderRadius: 8,
          backgroundColor: active ? INDIGO : '#fff',
          transform: [{ translateY }],
          opacity,
          ...shadowStyle(3),
        })}
      >
        <View
          style={tw.style(
            `border border-slate-300 gap-0.5 rounded-lg justify-center items-center flex-row px-2 py-1.5
            ${colorByFilter(currentFilter, expiredDate, 'bg')} 
            ${active ? 'border-indigo-100' : ''}`
          )}
        >
          {getDiffDate(expiredDate) <= 7 && (
            <View
              style={tw`w-1.5 aspect-square rounded-full absolute top-0.5 right-0.5
              bg-[${getColorByLeftDay(expiredDate)}]`}
            />
          )}

          <CategoryIcon category={food.category} size={15} />

          <Text
            fontSize={18}
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
