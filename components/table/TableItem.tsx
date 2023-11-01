import { Animated } from 'react-native';
import { Text, TouchableOpacity } from '../common/native-component';
import { Food, initialFridgeFood } from '../../constant/foodInfo';
import { ReactNode } from 'react';
import { AnimationState, useSlideAnimation } from '../../hooks';
import { shadowStyle } from '../../constant/shadowStyle';

import CheckBox from '../common/CheckBox';
import tw from 'twrnc';

interface Props {
  endChildren?: ReactNode;
  frontChildren?: ReactNode;
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
  frontChildren,
  endChildren,
  animationState,
  afterAnimation,
}: Props) {
  const slideDownIn = animationState === 'slidedown-in';
  const slideUpOut = animationState === 'slideup-out';

  const ITEM_HEIGHT = 46;

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

  return (
    <Animated.View
      style={{
        height,
        opacity: interpolatedOpacity,
        overflow: 'hidden',
        marginHorizontal: -4,
      }}
    >
      <TouchableOpacity
        onPress={() => onCheckBoxPress(initializedFood)}
        style={tw.style(
          `border h-[${ITEM_HEIGHT - 5}px] ${
            isCheckedItem ? 'border-blue-500' : 'border-slate-200'
          } bg-white flex-row items-center gap-1 pl-3 rounded-lg mx-1`,
          shadowStyle(4)
        )}
      >
        <CheckBox checked={!!isCheckedItem} />

        {frontChildren}

        <Text
          numberOfLines={1}
          ellipsizeMode='tail'
          style={tw`text-slate-800 flex-1`}
        >
          {initializedFood.name}
        </Text>

        {endChildren}
      </TouchableOpacity>
    </Animated.View>
  );
}
