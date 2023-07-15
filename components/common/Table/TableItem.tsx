import { View } from 'react-native';
import { Text, TouchableOpacity } from '../../native-component';
import { cutLetter, scaleH } from '../../../util';
import { BLUE, GRAY, INDIGO, LIGHT_GRAY } from '../../../constant/colors';
import { Food } from '../../../constant/foods';
import { ReactNode } from 'react';
import Icon from '../../native-component/Icon';
import tw from 'twrnc';
import CheckBox from '../Box/CheckBox';

interface Props {
  food: Food;
  onCheckPress: (food: Food) => void;
  existInList: (id: string) => Food | undefined;
  children?: ReactNode;
  image?: boolean;
  disabled?: boolean;
}

export default function TableItem({
  image = true,
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
      style={tw`flex-row gap-1 border-b border-slate-300 items-center justify-between h-[${scaleH(
        48
      )}px]`}
    >
      <CheckBox checked={!!existInList(food.id)} activeColor={BLUE} />
      <View style={tw`flex-1 flex-row items-center gap-2 ml-1`}>
        {image &&
          (food.image === '' ? (
            <Icon
              type='MaterialCommunityIcons'
              name='food'
              size={18}
              color={LIGHT_GRAY}
            />
          ) : (
            <Text fontSize={14}>{food.image}</Text>
          ))}
        <Text
          fontSize={14}
          style={tw`flex-1 py-1 ${
            existInList(food.id) ? 'text-blue-600' : 'text-slate-700'
          }`}
        >
          {cutLetter(food.name, 28)}
        </Text>
      </View>
      <View style={tw`items-end w-[16%]`}>{children}</View>
    </TouchableOpacity>
  );
}
