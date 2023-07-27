import { Food } from '../../../constant/foods';
import { Text, TouchableOpacity } from '../../native-component';
import { scaleH } from '../../../util';
import { useState } from 'react';
import { DEEP_YELLOW, LIGHT_GRAY } from '../../../constant/colors';
import Icon from '../../native-component/Icon';
import tw from 'twrnc';

interface Props {
  food: Food;
}

export default function CheckFoodBox({ food }: Props) {
  const [checked, setChecked] = useState(false);

  return (
    <TouchableOpacity
      key={food.id}
      onPress={() => setChecked((prev) => !prev)}
      style={tw`${
        checked ? 'border-amber-500 bg-amber-50' : 'bg-white border-indigo-300'
      } flex-row items-center gap-0.5 rounded-lg border-2 
      px-[${scaleH(10)}px] py-[${scaleH(5)}px]`}
    >
      <Icon
        name={checked ? 'cart-arrow-down' : 'cart-outline'}
        type='MaterialCommunityIcons'
        size={16}
        color={checked ? DEEP_YELLOW : LIGHT_GRAY}
      />
      <Text
        fontSize={14}
        style={tw`${checked ? 'text-amber-500' : 'text-slate-500'} py-1`}
      >
        {food.name}
      </Text>
    </TouchableOpacity>
  );
}
