import { Animated, View } from 'react-native';
import { Text } from './native-component';
import { cutLetter, expired, leftThreeDays } from '../../util';
import { Food } from '../../constant/foodInfo';
import { EXPIRED_COLOR, LEFT_3_DAYS_COLOR } from './FilterTag';
import { useHandleFilter, usePulseAnimation } from '../../hooks';
import { useSelector } from '../../redux/hook';

import ExpiredExclamation from './ExpiredExclamation';
import tw from 'twrnc';

interface Props {
  food: Food;
}

export default function FoodBox({ food }: Props) {
  const { searchedFoodName } = useSelector((state) => state.searchedFoodName);
  const { expiredDate } = food;

  const { currentFilter } = useHandleFilter();

  const colorByExpiredDate = () => {
    if (currentFilter === '소비기한 만료' && expired(expiredDate))
      return EXPIRED_COLOR;

    if (currentFilter === '소비기한 3일 이내' && leftThreeDays(expiredDate))
      return LEFT_3_DAYS_COLOR;

    return '';
  };

  const searchActive = searchedFoodName === food.name;
  const { opacity, translateY } = usePulseAnimation({ active: searchActive });

  return (
    <Animated.View
      style={{
        borderRadius: 8,
        backgroundColor: searchActive ? '#dcd3ff' : '#fff',
        transform: [{ translateY }],
        opacity,
      }}
    >
      <View
        style={tw.style(
          `${colorByExpiredDate()} gap-1 h-8.5 rounded-lg justify-center items-center flex-row border border-slate-300 px-2.5`
        )}
      >
        <ExpiredExclamation expiredDate={expiredDate} />

        <Text
          style={tw`${colorByExpiredDate()} ${
            searchActive ? 'text-indigo-600' : ''
          } text-center`}
        >
          {cutLetter(food.name, 9)}
        </Text>
      </View>
    </Animated.View>
  );
}
