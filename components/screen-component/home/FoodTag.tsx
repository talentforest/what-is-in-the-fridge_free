import { Image, View } from 'react-native';
import { Food } from '../../../constant/foods';
import { ORANGE_RED } from '../../../constant/colors';
import { cutLetter, getLeftDays } from '../../../util';
import { EntranceTitle } from './EntranceBox';
import { Text } from '../../native-component';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import tw from 'twrnc';

interface Props {
  food: Food;
  label: EntranceTitle;
}

export default function FoodTag({ food, label }: Props) {
  const leftDays = getLeftDays(food.expirationDate);
  // 31일 이전이면 주 단위로 -> 27일 -> 3주 6일

  return (
    <View
      key={food.id}
      style={tw`w-19 border-2 bg-white border-indigo-200 justify-between items-center rounded-lg py-2`}
    >
      <View style={tw`h-8 w-6 justify-center`}>
        {food.image.includes('http') ? (
          <Image style={tw`h-5 w-5 rounded-md`} source={{ uri: food.image }} />
        ) : (
          <Text styletw='text-xl pt-0.5'>{food.image}</Text>
        )}
      </View>
      <Text styletw={'text-xs text-center text-slate-600'}>
        {cutLetter(food.name, 6)}
      </Text>

      {label === '자주 먹는 식료품 목록' && (
        <Icon name='heart' size={18} color={ORANGE_RED} />
      )}

      {label === '유통기한 주의 식료품 목록' && (
        <Text
          styletw={`text-${0 > leftDays ? 'red' : 'yellow'}-600 text-xs pt-1`}
        >
          {leftDays >= 0 ? `${leftDays}일 남음` : `${leftDays}일`}
        </Text>
      )}
    </View>
  );
}
