import { Image, View } from 'react-native';
import { Text } from '../native-component';
import { cutLetter } from '../../util';
import { Food } from '../../constant/foods';
import tw from 'twrnc';
import useExpiredFoods from '../../hooks/useExpiredFoods';

interface Props {
  food: Food;
}

export default function SmallFoodTag({ food }: Props) {
  const { checkExpired, checkLeftThreeDays } = useExpiredFoods();
  const { expiredDate } = food;

  return (
    <View
      key={food.id}
      style={tw`border bg-white border-slate-300 gap-1 justify-center items-center h-8 flex-row px-2 py-1 rounded-2xl ${
        checkExpired(expiredDate)
          ? 'bg-red-100'
          : checkLeftThreeDays(expiredDate)
          ? 'bg-amber-100'
          : ''
      }`}
    >
      {food.image.includes('http') ? (
        <Image style={tw`h-5 w-5 rounded-md`} source={{ uri: food.image }} />
      ) : (
        <Text styletw='text-xs pt-0.5'>{food.image}</Text>
      )}
      <Text styletw={'text-xs text-center text-slate-600'}>
        {cutLetter(food.name, 6)}
      </Text>
      {(checkExpired(expiredDate) || checkLeftThreeDays(expiredDate)) && (
        <View
          style={tw`h-2 w-2 rounded-full right-0 top-0 ${
            checkExpired(expiredDate)
              ? 'bg-red-500'
              : checkLeftThreeDays(expiredDate)
              ? 'bg-amber-500'
              : ''
          }`}
        />
      )}
    </View>
  );
}
