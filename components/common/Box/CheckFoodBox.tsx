import { Food } from '../../../constant/foods';
import { Text, TouchableOpacity } from '../../native-component';
import { scaleFont, scaleH } from '../../../util';
import { useState } from 'react';
import { LIGHT_GRAY, ORANGE_RED } from '../../../constant/colors';
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
        checked
          ? 'border-orange-500 bg-orange-100'
          : 'bg-white border-indigo-300'
      } px-2.5 flex-row items-center gap-0.5 rounded-lg border-2 h-[${scaleH(
        10
      )}]`}
    >
      <Icon
        name='cart-arrow-down'
        type='MaterialCommunityIcons'
        size={16}
        color={checked ? ORANGE_RED : LIGHT_GRAY}
      />
      <Text
        style={tw`${
          checked ? 'text-orange-500' : 'text-slate-500'
        } text-[${scaleFont(14)}px]`}
      >
        {food.name}
      </Text>
    </TouchableOpacity>
  );
}
