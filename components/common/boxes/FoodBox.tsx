import { View } from 'react-native';
import { Food } from '../../../constant/foods';
import { cutLetter, scaleH } from '../../../util';
import { Text } from '../../native-component';
import LeftDay from '../LeftDay';
import tw from 'twrnc';

interface Props {
  food: Food;
  expiredDate?: boolean;
  color: 'amber' | 'slate';
}

export default function FoodBox({ food, expiredDate, color }: Props) {
  return (
    <View
      key={food.id}
      style={tw`bg-${color}-50 border-2 border-${color}-600 gap-1 justify-center items-center flex-row px-[${scaleH(
        10
      )}px] py-[${scaleH(5)}px] rounded-lg `}
    >
      <Text style={tw`text-center text-${color}-700 py-1`}>
        {cutLetter(food.name, 6)}
      </Text>
      {expiredDate && <LeftDay expiredDate={food.expiredDate} />}
    </View>
  );
}
