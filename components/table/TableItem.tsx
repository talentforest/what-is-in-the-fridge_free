import { Animated, View } from 'react-native';
import { Text, TouchableOpacity } from '../common/native-component';
import { cutLetter } from '../../util';
import { BLUE } from '../../constant/colors';
import { Food, initialFoodInfo } from '../../constant/foods';
import { ReactNode } from 'react';
import { AnimationState, useFindFood, useSlideAnimation } from '../../hooks';
import { useRoute } from '@react-navigation/native';

import CheckBox from '../common/CheckBox';
import CategoryImageIcon from '../common/CategoryImageIcon';
import IndicatorExist from '../common/IndicatorExist';
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
  const { findFoodInFridge } = useFindFood();
  const route = useRoute();
  const shoppingListRoute = route.name === 'ShoppingList';
  const existItemTag = shoppingListRoute && findFoodInFridge(food.name);

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

  const { id, name, favorite, category, space } = food;
  const initializedFood = {
    ...initialFoodInfo,
    id,
    name,
    favorite,
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
        style={tw`h-11 border border-slate-300 rounded-lg bg-white flex-row items-center gap-1 px-3`}
      >
        <CheckBox checked={!!isCheckedItem} activeColor={BLUE} />

        {route.name === 'FavoriteFoods' && (
          <CategoryImageIcon kind='icon' category={category} size={17} />
        )}

        <View style={tw`flex-1 flex-row items-center gap-2`}>
          <Text style={tw`${textColor}`}>
            {cutLetter(initializedFood.name, 14)}
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
