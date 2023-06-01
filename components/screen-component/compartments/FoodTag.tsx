import { View } from 'react-native';
import { Text } from '../../native-component';
import { cutLetter } from '../../../util';
import { Food } from '../../../constant/foods';
import { INDIGO, ORANGE, ORANGE_RED } from '../../../constant/colors';
import useExpiredFoods from '../../../hooks/useExpiredFoods';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import tw from 'twrnc';

interface Props {
  food: Food;
}

export default function FoodTag({ food }: Props) {
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
      style={tw`${bgColor} border border-slate-300 gap-1 justify-center items-center flex-row px-2 py-1 rounded-2xl`}
    >
      {food.image === '' ? (
        <Icon name='food-fork-drink' size={14} color={INDIGO} />
      ) : (
        <Text styletw='text-xs pt-0.5'>{food.image}</Text>
      )}
      <Text styletw={'text-xs text-center text-slate-600'}>
        {cutLetter(food.name, 6)}
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
