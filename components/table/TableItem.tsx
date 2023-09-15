import { Animated, View } from 'react-native';
import { Text, TouchableOpacity } from '../common/native-component';
import { cutLetter } from '../../util';
import {
  BLUE,
  DEEP_YELLOW,
  GRAY,
  LIGHT_BLUE,
  LIGHT_RED,
} from '../../constant/colors';
import { Food, initialFood } from '../../constant/foodInfo';
import { ReactNode } from 'react';
import { AnimationState, useFindFood, useSlideAnimation } from '../../hooks';
import { useRoute } from '@react-navigation/native';

import CheckBox from '../common/CheckBox';
import IndicatorExist from '../common/IndicatorExist';
import tw from 'twrnc';
import Icon from '../common/native-component/Icon';

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
  const { findFood } = useFindFood();
  const route = useRoute();
  const shoppingListRoute = route.name === 'ShoppingList';
  const existItemTag = shoppingListRoute && findFood(food.name);

  const slideDownIn = animationState === 'slidedown-in';
  const slideUpOut = animationState === 'slideup-out';

  const ITEM_HEIGHT = 50;
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
        style={tw`shadow-md h-11 border ${
          isCheckedItem ? 'border-blue-500' : 'border-slate-200'
        } bg-white flex-row items-center gap-1.5 px-3`}
      >
        <CheckBox checked={!!isCheckedItem} activeColor={BLUE} />

        <View style={tw`flex-1 flex-row items-center gap-1`}>
          {route.name === 'ExpiredFoods' &&
            (space === '팬트리' ? (
              <Icon
                name='inbox-multiple'
                type='MaterialCommunityIcons'
                size={16}
                color={DEEP_YELLOW}
              />
            ) : (
              <Icon
                name='fridge'
                type='MaterialCommunityIcons'
                size={16}
                color={GRAY}
              />
            ))}
          <Text style={tw`${textColor} ml-1`}>
            {cutLetter(initializedFood.name, 18)}
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
