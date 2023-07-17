import { View } from 'react-native';
import { Food } from '../../../constant/foods';
import { cutLetter, scaleFont, scaleH } from '../../../util';
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
      style={tw`bg-amber-50 border-2 border-indigo-200 gap-1 justify-center items-center flex-row px-[${scaleFont(
        10
      )}px] py-[${scaleFont(5)}px] rounded-lg `}
    >
      {food.image && <Text>{food.image}</Text>}
      <Text style={tw`text-center text-slate-600 py-1`}>
        {cutLetter(food.name, 6)}
      </Text>
      {expiredDate && <LeftDay expiredDate={food.expiredDate} />}
    </View>
  );
}
