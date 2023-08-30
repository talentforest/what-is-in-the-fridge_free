import { View } from 'react-native';
import { Text } from '../../native-component';
import { Filter, cutLetter } from '../../../util';
import { Food } from '../../../constant/foods';
import {
  INACTIVE_COLOR as DEFAULT_COLOR,
  EXPIRED_COLOR,
  LEFT_3_DAYS_COLOR,
} from '../../common/table/TableFilters';

import useExpiredFoods from '../../../hooks/useExpiredFoods';
import tw from 'twrnc';

interface Props {
  food: Food;
  moveMode: boolean;
  filter: Filter;
}

export default function FoodBox({ food, moveMode, filter }: Props) {
  const { checkExpired, checkLeftThreeDays } = useExpiredFoods();
  const { expiredDate } = food;

  const activeColor = () => {
    if (filter === '유통기한 지남' && checkExpired(expiredDate))
      return EXPIRED_COLOR;

    if (filter === '유통기한 3일 이내' && checkLeftThreeDays(expiredDate))
      return LEFT_3_DAYS_COLOR;

    return DEFAULT_COLOR;
  };

  return (
    <View
      key={food.id}
      style={tw`rounded-full justify-center items-center flex-row border ${activeColor()} h-7.5 px-3`}
    >
      <Text style={tw`text-center ${activeColor()} text-sm`}>
        {cutLetter(food.name, 8)}
      </Text>
    </View>
  );
}
