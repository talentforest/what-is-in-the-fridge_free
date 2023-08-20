import { View } from 'react-native';
import { Text, TouchableOpacity } from '../../native-component';
import { cutLetter, scaleH } from '../../../util';
import { BLUE } from '../../../constant/colors';
import { Food, initialFoodInfo } from '../../../constant/foods';
import { ReactNode } from 'react';
import tw from 'twrnc';
import CheckBox from '../boxes/CheckBox';

interface Props {
  food: Food;
  onCheckBoxPress: (food: Food) => void;
  isCheckedItem: (id: string) => Food | undefined;
  children?: ReactNode;
  disabled?: boolean;
}

export default function TableItem({
  food,
  onCheckBoxPress,
  isCheckedItem,
  children,
  disabled,
}: Props) {
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
    <TouchableOpacity
      disabled={disabled}
      onPress={() => onCheckBoxPress(initializedFood)}
      style={tw`flex-row items-center justify-between h-[${scaleH(45)}px]`}
    >
      <CheckBox
        checked={!!isCheckedItem(initializedFood.id)}
        activeColor={BLUE}
      />
      <Text
        style={tw`flex-1 p-1 pr-0 ${
          isCheckedItem(initializedFood.id) ? 'text-blue-600' : 'text-slate-700'
        }`}
      >
        {cutLetter(initializedFood.name, 28)}
      </Text>
      <View style={tw`items-end w-[18%]`}>{children}</View>
    </TouchableOpacity>
  );
}
