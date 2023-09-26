import { Animated, View } from 'react-native';
import { Text, TouchableOpacity } from '../common/native-component';
import { cutLetter, expired } from '../../util';
import { BLUE } from '../../constant/colors';
import { Food, initialFood } from '../../constant/foodInfo';
import { ReactNode } from 'react';
import { AnimationState, useFindFood, useSlideAnimation } from '../../hooks';
import { useRoute } from '@react-navigation/native';

import CheckBox from '../common/CheckBox';
import IndicatorExist from '../common/IndicatorExist';
import Icon from '../common/native-component/Icon';
import tw from 'twrnc';

interface Props {
  children?: ReactNode;
  food: Food;
  onCheckBoxPress: (food: Food) => void;
  isCheckedItem: boolean;
  animationState: AnimationState;
  afterAnimation: () => void;
}

export default function TableItem({
  food,
  onCheckBoxPress,
  isCheckedItem,
  children,
  animationState,
  afterAnimation,
}: Props) {
  const route = useRoute();
  const shoppingListRoute = route.name === 'ShoppingList';
  const { findFood } = useFindFood();
  const existItemTag = shoppingListRoute && findFood(food.name);

  const slideDownIn = animationState === 'slidedown-in';
  const slideUpOut = animationState === 'slideup-out';

  const ITEM_HEIGHT = 55;
  const initialValue =
    isCheckedItem && slideUpOut ? ITEM_HEIGHT : slideDownIn ? 0 : ITEM_HEIGHT;
  const toValue = isCheckedItem && slideUpOut ? 0 : ITEM_HEIGHT;

  const { height, interpolatedOpacity } = useSlideAnimation({
    initialValue,
    toValue,
    active: slideDownIn || slideUpOut,
    afterAnimation,
  });

  const { id, name, category, space } = food;
  const initializedFood = {
    ...initialFood,
    id,
    name,
    category,
    space,
  };

  const existTagColor = existItemTag ? 'text-slate-400' : 'text-slate-800';
  const textColor = isCheckedItem ? 'text-blue-600' : existTagColor;

  return (
    <Animated.View
      style={{
        height,
        opacity: interpolatedOpacity,
        overflow: 'hidden',
        paddingHorizontal: 8,
      }}
    >
      <TouchableOpacity
        onPress={() => onCheckBoxPress(initializedFood)}
        style={tw`shadow-md border h-[${ITEM_HEIGHT - 8}px] ${
          isCheckedItem ? 'border-blue-500' : 'border-slate-200'
        } bg-white flex-row items-center gap-1.5 px-3`}
      >
        <CheckBox checked={!!isCheckedItem} activeColor={BLUE} />

        <View style={tw`flex-1 flex-row items-center gap-1`}>
          {expired(food.expiredDate) && route.name === 'ExpiredFoods' && (
            <Icon
              name='exclamation-thick'
              type='MaterialCommunityIcons'
              color='red'
            />
          )}
          <Text style={tw`${textColor}`}>
            {cutLetter(
              initializedFood.name,
              route.name !== 'ExpiredFoods' ? 14 : 13
            )}
          </Text>

          {existItemTag && (
            <View style={tw`flex-1 items-start`}>
              <IndicatorExist name={food.name} roundedBorder />
            </View>
          )}
        </View>

        {children}
      </TouchableOpacity>
    </Animated.View>
  );
}
