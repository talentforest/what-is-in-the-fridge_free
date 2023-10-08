import { Animated, View } from 'react-native';
import { Text, TouchableOpacity } from '../common/native-component';
import { Food, initialFridgeFood } from '../../constant/foodInfo';
import { ReactNode } from 'react';
import { AnimationState, useFindFood, useSlideAnimation } from '../../hooks';
import { useRoute } from '@react-navigation/native';
import { shadowStyle } from '../../constant/shadowStyle';

import CheckBox from '../common/CheckBox';
import IndicatorExist from '../common/IndicatorExist';
import CategoryIcon from '../common/CategoryIcon';
import ExpiredExclamation from '../common/ExpiredExclamation';
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
    ...initialFridgeFood,
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
      }}
    >
      <TouchableOpacity
        onPress={() => onCheckBoxPress(initializedFood)}
        style={tw.style(
          `border h-[${ITEM_HEIGHT - 6}px] ${
            isCheckedItem ? 'border-blue-500' : 'border-slate-200'
          } bg-white flex-row items-center gap-1.5 px-3`,
          shadowStyle(4)
        )}
      >
        <CheckBox checked={!!isCheckedItem} />

        <View style={tw`flex-1 flex-row items-center gap-1`}>
          {route.name === 'ExpiredFoods' && (
            <ExpiredExclamation expiredDate={food.expiredDate} />
          )}

          {!shoppingListRoute && <CategoryIcon size={16} category={category} />}
          <Text
            numberOfLines={1}
            ellipsizeMode='tail'
            style={tw`${textColor} flex-1`}
          >
            {initializedFood.name}
          </Text>

          {existItemTag && (
            <View style={tw`w-11 ml-2`}>
              <IndicatorExist name={food.name} roundedBorder />
            </View>
          )}
        </View>

        {children}
      </TouchableOpacity>
    </Animated.View>
  );
}
