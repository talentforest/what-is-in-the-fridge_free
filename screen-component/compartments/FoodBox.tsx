import { View } from 'react-native';
import { Text } from '../../components/common/native-component';
import { cutLetter, expired, leftThreeDays } from '../../util';
import { Food } from '../../constant/foodInfo';
import {
  INACTIVE_COLOR as DEFAULT_COLOR,
  EXPIRED_COLOR,
  LEFT_3_DAYS_COLOR,
} from '../../components/common/FilterTag';
import { useSelector } from '../../redux/hook';
import tw from 'twrnc';

interface Props {
  food: Food;
}

export default function FoodBox({ food }: Props) {
  const { expiredDate } = food;
  const { currentFilter } = useSelector((state) => state.currentFilter);

  const activeColor = () => {
    if (currentFilter === '유통기한 만료' && expired(expiredDate))
      return EXPIRED_COLOR;

    if (currentFilter === '유통기한 3일 이내' && leftThreeDays(expiredDate))
      return LEFT_3_DAYS_COLOR;

    return DEFAULT_COLOR;
  };

  return (
    <View
      key={food.id}
      style={tw`${activeColor()} rounded-lg justify-center items-center flex-row border h-8 px-2.5`}
    >
      <Text style={tw`text-center ${activeColor()}`}>
        {cutLetter(food.name, 8)}
      </Text>
    </View>
  );
}
