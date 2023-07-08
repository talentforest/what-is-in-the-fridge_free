import { View } from 'react-native';
import { Food } from '../../../constant/foods';
import { cutLetter, scaleH } from '../../../util';
import { Text } from '../../native-component';
import LeftDay from '../LeftDay';
import tw from 'twrnc';

interface Props {
  food: Food;
  expiredDate?: boolean;
}

export default function FoodBox({ food, expiredDate }: Props) {
  return (
    <View
      key={food.id}
      style={tw`bg-amber-50 border-2 border-indigo-200 gap-1 justify-center items-center flex-row p-2 rounded-lg h-${scaleH(
        10
      )}`}
    >
      {food.image && <Text fontSize={12}>{food.image}</Text>}
      <Text style={tw`text-center text-slate-600 pt-0.5`} fontSize={14}>
        {cutLetter(food.name, 6)}
      </Text>
      {expiredDate && <LeftDay fontSize={12} expiredDate={food.expiredDate} />}
    </View>
  );
}
