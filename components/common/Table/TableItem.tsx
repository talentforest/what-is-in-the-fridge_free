import { View } from 'react-native';
import { Text, TouchableOpacity } from '../../native-component';
import { cutLetter, scaleH } from '../../../util';
import { BLUE } from '../../../constant/colors';
import { Food } from '../../../constant/foods';
import { ReactNode } from 'react';
import tw from 'twrnc';
import CheckBox from '../boxes/CheckBox';

interface Props {
  food: Food;
  onCheckPress: (food: Food) => void;
  existInList: (id: string) => Food | undefined;
  children?: ReactNode;
  disabled?: boolean;
}

export default function TableItem({
  food,
  onCheckPress,
  existInList,
  children,
  disabled,
}: Props) {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={() => onCheckPress(food)}
      style={tw`flex-row gap-0 border-b border-slate-300 items-center justify-between h-[${scaleH(
        48
      )}px]`}
    >
      <CheckBox checked={!!existInList(food.id)} activeColor={BLUE} />
      <Text
        style={tw`flex-1 p-1 pr-0 ${
          existInList(food.id) ? 'text-blue-600' : 'text-slate-700'
        }`}
      >
        {cutLetter(food.name, 28)}
      </Text>
      <View style={tw`items-end w-[18%]`}>{children}</View>
    </TouchableOpacity>
  );
}
