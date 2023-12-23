import { Animated, View } from 'react-native';
import { Text, TouchableOpacity } from '../common/native-component';
import { Food, initialFridgeFood } from '../../constant/foodInfo';
import { ReactNode } from 'react';
import { useItemSlideAnimation } from '../../hooks';
import { useDispatch, useSelector } from '../../redux/hook';
import { shadowStyle } from '../../constant/shadowStyle';
import { setCheckedList } from '../../redux/slice/food-list/checkListSlice';
import { showOpenFoodDetailModal } from '../../redux/slice/modalVisibleSlice';
import {
  saveOriginFood,
  setFormFood,
} from '../../redux/slice/food/formFoodSlice';

import CheckBox from '../common/CheckBox';
import tw from 'twrnc';

interface Props {
  food: Food;
  endChildren?: ReactNode;
  frontChildren?: ReactNode;
  checkBox?: boolean;
}

export const TABLE_ITEM_HEIGHT = 45;

export default function TableItem({
  food,
  frontChildren,
  endChildren,
  checkBox,
}: Props) {
  const { afterAnimation } = useSelector((state) => state.afterAnimation);
  const { checkedList } = useSelector((state) => state.checkedList);

  const isCheckedItem = (ID: string) => checkedList.find(({ id }) => id === ID);

  const checkedItem = !!isCheckedItem(food.id);

  const { height, interpolatedOpacity } = useItemSlideAnimation({
    initialValue: TABLE_ITEM_HEIGHT,
    toValue: 0,
    active: checkedItem && afterAnimation === 'slideup-out',
  });

  const { id, name, category, space } = food;

  const initializedFood = {
    ...initialFridgeFood,
    id,
    name,
    category,
    space,
  };

  const dispatch = useDispatch();

  const onOpenFoodDetailPress = () => {
    dispatch(setFormFood(food));
    dispatch(saveOriginFood(food));
    dispatch(showOpenFoodDetailModal(true));
  };

  const onCheckBoxPress = () => {
    const unselectItem = checkedList.filter((item) => item.id !== id);
    const selectItem = [...checkedList, initializedFood];
    const toggleItem = isCheckedItem(id) ? unselectItem : selectItem;
    dispatch(setCheckedList(toggleItem));
  };

  const onItemPress = () => {
    return checkBox ? onCheckBoxPress() : onOpenFoodDetailPress();
  };

  return (
    <View>
      <Animated.View
        style={{
          height,
          opacity: interpolatedOpacity,
          overflow: 'hidden',
          marginHorizontal: -4,
        }}
      >
        <TouchableOpacity
          onPress={onItemPress}
          style={tw.style(
            `border h-[${TABLE_ITEM_HEIGHT - 4}px] 
            ${checkedItem ? 'border-blue-400' : 'border-slate-200'} 
            bg-white flex-row items-center gap-1 pl-3 rounded-xl mx-1`,
            shadowStyle(4)
          )}
        >
          {checkBox && <CheckBox checked={checkedItem} />}

          {frontChildren}

          <Text
            numberOfLines={1}
            ellipsizeMode='tail'
            style={tw`${
              checkedItem ? 'text-blue-700' : 'text-slate-800'
            } flex-1 pl-0.5 pr-1`}
          >
            {initializedFood.name}
          </Text>

          {endChildren}
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}
