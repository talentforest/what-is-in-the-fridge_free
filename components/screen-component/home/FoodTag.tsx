import { View } from 'react-native';
import { Food } from '../../../constant/foods';
import { cutLetter } from '../../../util';
import { Text } from '../../native-component';
import useExpiredFoods from '../../../hooks/useExpiredFoods';
import tw from 'twrnc';
import { ReactNode } from 'react';

interface Props {
  food: Food;
  children: ReactNode;
}

export default function FoodTag({ food, children }: Props) {
  return (
    <View
      key={food.id}
      style={tw`bg-amber-50 border border-indigo-200 gap-1.5 justify-center items-center h-8 flex-row px-3 py-1 rounded-full`}
    >
      <Text styletw='pt-0.5 text-xs'>{food.image}</Text>
      <Text styletw={'text-center text-[13px] text-slate-700'}>
        {cutLetter(food.name, 6)}
      </Text>
      {children}
    </View>
  );
}
