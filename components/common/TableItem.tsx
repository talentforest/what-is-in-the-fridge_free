import { View } from 'react-native';
import { Text, TouchableOpacity } from '../native-component';
import { cutLetter } from '../../util';
import { INDIGO } from '../../constant/colors';
import { Food } from '../../constant/foods';
import { ReactNode } from 'react';
import { INACTIVE_COLOR } from '../../constant/colors';
import Icon from 'react-native-vector-icons/Feather';
import useRouteName from '../../hooks/useRouteName';
import tw from 'twrnc';

interface Props {
  food: Food;
  checkList: Food[];
  children: ReactNode;
  setCheckList: (food: Food[]) => void;
  setEntireCheck: (check: boolean) => void;
}

export default function TableItem({
  food,
  checkList,
  setCheckList,
  children,
}: Props) {
  const { currRoute } = useRouteName();

  const onCheckPress = (food: Food) => {
    if (existInList(food.id)) {
      return setCheckList(checkList.filter((item) => item.id !== food.id));
    }
    setCheckList([...checkList, food]);
  };

  const existInList = (id: string) => {
    return checkList.find((food) => food.id === id);
  };

  return (
    <TouchableOpacity
      onPress={() => onCheckPress(food)}
      style={tw`h-12 flex-row gap-2 items-center justify-between border-b border-slate-300`}
    >
      <Icon
        name={!existInList(food.id) ? 'square' : 'check-square'}
        size={18}
        color={!existInList(food.id) ? INACTIVE_COLOR : INDIGO}
      />
      <View style={tw`flex-1 flex-row items-center gap-2`}>
        {currRoute !== 'ShoppingList' && (
          <Text styletw='text-2xl'>{food.image}</Text>
        )}
        <Text styletw='flex-1 text-sm'>{cutLetter(food.name, 28)}</Text>
      </View>
      <View style={tw`w-22 items-end`}>{children}</View>
    </TouchableOpacity>
  );
}
