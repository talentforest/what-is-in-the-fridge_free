import { View } from 'react-native';
import { Text } from '../native-component';
import { cutLetter } from '../../util';
import { Food } from '../../constant/foods';
import tw from 'twrnc';

interface Props {
  food: Food;
}

export default function FoodTag({ food }: Props) {
  return (
    <View
      style={tw`self-stretch h-8 justify-center bg-white px-2 rounded-full border border-indigo-300`}
    >
      <View style={tw`flex-1 h-full flex-row justify-center items-center`}>
        <Text styletw={`text-sm mr-0.5 text-center`}>{food.image}</Text>
        <Text styletw={'text-xs text-center'}>{cutLetter(food.name, 6)}</Text>
      </View>
    </View>
  );
}
