import { View } from 'react-native';
import { Food } from '../../../constant/foods';
import { cutLetter, scaleFont, scaleH } from '../../../util';
import { Text } from '../../native-component';
import { ReactNode } from 'react';
import tw from 'twrnc';

interface Props {
  food: Food;
  children?: ReactNode;
}

export default function FoodTag({ food, children }: Props) {
  return (
    <View
      key={food.id}
      style={tw`bg-amber-50 border-2 border-indigo-200 gap-1 justify-center items-center flex-row p-2 rounded-lg`}
    >
      {food.image && (
        <Text style={tw`text-[${scaleFont(13)}px]`}>{food.image}</Text>
      )}
      <Text
        style={tw`text-center text-slate-600 text-[${scaleFont(14)}px]`}
        fontSize={12}
      >
        {cutLetter(food.name, 6)}
      </Text>
      {children ? children : <></>}
    </View>
  );
}
