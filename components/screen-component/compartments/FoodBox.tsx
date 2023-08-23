import { View } from 'react-native';
import { Text } from '../../native-component';
import { cutLetter, scaleH } from '../../../util';
import { Food } from '../../../constant/foods';
import useExpiredFoods from '../../../hooks/useExpiredFoods';
import tw from 'twrnc';

interface Props {
  food: Food;
}

export default function FoodBox({ food }: Props) {
  const { checkExpired, checkLeftThreeDays } = useExpiredFoods();
  const { expiredDate } = food;

  const bgColor = checkExpired(expiredDate)
    ? 'bg-red-100'
    : checkLeftThreeDays(expiredDate)
    ? 'bg-amber-100'
    : 'bg-blue-50';

  const textColor = checkExpired(expiredDate) ? 'bg-red-500' : 'bg-amber-500';

  return (
    <View
      key={food.id}
      style={tw`rounded-full gap-1 justify-center items-center flex-row
      ${bgColor} h-[${scaleH(25)}px] px-[${scaleH(9)}px`}
    >
      <Text fontSize={14} style={tw`text-center text-slate-600 py-0.5`}>
        {cutLetter(food.name, 8)}
      </Text>

      {(checkExpired(expiredDate) || checkLeftThreeDays(expiredDate)) && (
        <View style={tw`h-2 w-2 rounded-full ${textColor}`} />
      )}
    </View>
  );
}
