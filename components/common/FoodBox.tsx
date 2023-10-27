import { Animated, View } from 'react-native';
import { Text } from './native-component';
import {
  cutLetter,
  expired,
  getTagColor,
  leftThreeDays,
  leftWeek,
} from '../../util';
import { Food } from '../../constant/foodInfo';
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

  const colorByFilter = (type: 'text' | 'bg') => {
    const active =
      currentFilter === '소비기한 만료'
        ? expired(expiredDate)
        : currentFilter === '소비기한 3일 이내'
        ? leftThreeDays(expiredDate)
        : currentFilter === '소비기한 일주일 이내'
        ? leftWeek(expiredDate)
        : false;
    return getTagColor(currentFilter, active, type);
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
          `${colorByFilter('bg')} 
          gap-1 h-8.5 rounded-lg justify-center items-center flex-row border border-slate-300 px-2.5`
        )}
      >
        <ExpiredExclamation expiredDate={expiredDate} />

        <Text
          style={tw`${colorByFilter('text')} 
          ${searchActive ? 'text-indigo-600' : ''} text-center`}
        >
          {cutLetter(food.name, 9)}
        </Text>
      </View>
    </Animated.View>
  );
}
