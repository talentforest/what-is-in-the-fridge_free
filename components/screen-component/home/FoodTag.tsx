import { View } from 'react-native';
import { Food } from '../../../constant/foods';
import { cutLetter, scaleH } from '../../../util';
import { Text } from '../../native-component';
import { ReactNode } from 'react';
import tw from 'twrnc';

interface Props {
  food: Food;
  children: ReactNode;
}

export default function FoodTag({ food, children }: Props) {
  return (
    <View
      key={food.id}
      style={tw`h-[${scaleH(
        7
      )}] bg-amber-50 border border-indigo-200 gap-1.5 justify-center items-center flex-row px-2.5 rounded-full`}
    >
      {food.image && <Text fontSize={12}>{food.image}</Text>}
      <Text style={tw`text-center text-slate-500`} fontSize={12}>
        {cutLetter(food.name, 6)}
      </Text>
      {children}
    </View>
  );
}
