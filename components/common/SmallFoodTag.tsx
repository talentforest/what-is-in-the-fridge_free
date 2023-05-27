import { Image, View } from 'react-native';
import { Text } from '../native-component';
import { cutLetter, getLeftDays } from '../../util';
import { Food } from '../../constant/foods';
import tw from 'twrnc';

interface Props {
  food: Food;
}

export default function SmallFoodTag({ food }: Props) {
  const expired = 0 > getLeftDays(food.expirationDate);
  const leftThreeDays =
    0 <= getLeftDays(food.expirationDate) &&
    getLeftDays(food.expirationDate) < 4;

  return (
    <View
      key={food.id}
      style={tw`border bg-white border-slate-300 gap-1 justify-center items-center h-8 flex-row px-2 py-1 rounded-2xl ${
        expired ? 'bg-red-100' : leftThreeDays ? 'bg-amber-100' : ''
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
      {(expired || leftThreeDays) && (
        <View
          style={tw`h-2 w-2 rounded-full right-0 top-0 ${
            expired ? 'bg-red-500' : leftThreeDays ? 'bg-amber-500' : ''
          }`}
        />
      )}
    </View>
  );
}
