import { View } from 'react-native';
import { Text } from '../../native-component';
import { cutLetter, scaleH } from '../../../util';
import { Food } from '../../../constant/foods';
import { INDIGO } from '../../../constant/colors';
import Icon from '../../native-component/Icon';
import useExpiredFoods from '../../../hooks/useExpiredFoods';
import tw from 'twrnc';

interface Props {
  food: Food;
}

export default function FoodItem({ food }: Props) {
  const { checkExpired, checkLeftThreeDays } = useExpiredFoods();
  const { expiredDate } = food;

  const bgColor = checkExpired(expiredDate)
    ? 'bg-red-100'
    : checkLeftThreeDays(expiredDate)
    ? 'bg-amber-100'
    : 'bg-white';

  return (
    <View
      key={food.id}
      style={tw`${bgColor} h-[${scaleH(28)}px] px-[${scaleH(8)}px py-[${scaleH(
        3
      )}px] rounded-full border border-indigo-300 gap-1 justify-center items-center flex-row  `}
    >
      {food.image === '' ? (
        <Icon
          type='MaterialCommunityIcons'
          name='food'
          size={14}
          color={INDIGO}
        />
      ) : (
        <Text fontSize={12} style={tw`pb-0.5`}>
          {food.image}
        </Text>
      )}

      <Text fontSize={14} style={tw`text-center text-slate-600 py-0.5`}>
        {cutLetter(food.name, 8)}
      </Text>

      {(checkExpired(expiredDate) || checkLeftThreeDays(expiredDate)) && (
        <View
          style={tw`h-2 w-2 rounded-full ${
            checkExpired(expiredDate) ? 'bg-red-500' : 'bg-amber-500'
          }`}
        />
      )}
    </View>
  );
}
