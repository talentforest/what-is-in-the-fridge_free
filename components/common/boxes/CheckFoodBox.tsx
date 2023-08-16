import { Food } from '../../../constant/foods';
import { Text, TouchableOpacity } from '../../native-component';
import { scaleH } from '../../../util';
import { useState } from 'react';
import { BLUE, DEEP_YELLOW } from '../../../constant/colors';
import Icon from '../../native-component/Icon';
import tw from 'twrnc';

interface Props {
  food: Food;
}

export default function CheckFoodBox({ food }: Props) {
  const [checked, setChecked] = useState(false);

  const checkedBoxStyle = checked
    ? 'border-amber-500 bg-amber-50'
    : 'bg-white border-blue-300';

  const checkedTextStyle = checked ? 'text-amber-500' : 'text-blue-600';

  return (
    <TouchableOpacity
      key={food.id}
      onPress={() => setChecked((prev) => !prev)}
      style={tw`${checkedBoxStyle} flex-row items-center gap-0.5 rounded-lg border-2 
      pr-[${scaleH(7)}px] pl-[${scaleH(10)}px] py-[${scaleH(5)}px]`}
    >
      <Text fontSize={14} style={tw`${checkedTextStyle} py-1`}>
        {food.name}
      </Text>
      <Icon
        name={checked ? 'check-circle' : 'circle-outline'}
        type='MaterialCommunityIcons'
        size={14}
        color={checked ? DEEP_YELLOW : BLUE}
      />
    </TouchableOpacity>
  );
}
