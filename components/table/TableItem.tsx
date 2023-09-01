import { Animated, View } from 'react-native';
import { Text, TouchableOpacity } from '../common/native-component';
import { cutLetter } from '../../util';
import { BLUE } from '../../constant/colors';
import { Food, initialFoodInfo } from '../../constant/foods';
import { ReactNode } from 'react';
import { AnimationState, useFindFood, useSlideAnimation } from '../../hooks';
import { useRoute } from '@react-navigation/native';

import CheckBox from '../common/CheckBox';
import RoundedTag from '../common/RoundedTag';
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

  const initialValue = isCheckedItem && slideUpOut ? 48 : slideDownIn ? 0 : 48;
  const toValue = isCheckedItem && slideUpOut ? 0 : 48;

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

  return (
    <Animated.View
      style={{
        height,
        opacity: interpolatedOpacity,
      }}
    >
      <TouchableOpacity
        onPress={() => onCheckBoxPress(initializedFood)}
        style={tw`flex-row items-center gap-3 py-1 h-full border-b border-slate-300`}
      >
        <View style={tw`flex-row items-center gap-1.5 flex-1`}>
          <CheckBox checked={!!isCheckedItem} activeColor={BLUE} />
          <View style={tw`flex-1 flex-row items-center gap-2`}>
            <Text
              style={tw`${existItemTag ? 'max-w-[90%]' : 'flex-1'} ${
                isCheckedItem
                  ? 'text-blue-600'
                  : existItemTag
                  ? 'text-slate-400'
                  : 'text-slate-800'
              }`}
            >
              {cutLetter(initializedFood.name, 34)}
            </Text>
            {existItemTag && <RoundedTag name='있음' />}
          </View>
        </View>

        {children}
      </TouchableOpacity>
    </Animated.View>
  );
}
