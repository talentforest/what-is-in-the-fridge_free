import { View } from 'react-native';
import { Text } from './native-component';
import { cutLetter, expired, leftThreeDays } from '../../util';
import { Food } from '../../constant/foodInfo';
import {
  INACTIVE_COLOR as DEFAULT_COLOR,
  EXPIRED_COLOR,
  LEFT_3_DAYS_COLOR,
} from './FilterTag';
import { useHandleFilter } from '../../hooks';

import Icon from './native-component/Icon';
import tw from 'twrnc';

interface Props {
  food: Food;
}

export default function FoodBox({ food }: Props) {
  const { expiredDate } = food;

  const { currentFilter } = useHandleFilter();

  const activeColor = () => {
    if (currentFilter === '유통기한 만료' && expired(expiredDate))
      return EXPIRED_COLOR;

    if (currentFilter === '유통기한 3일 이내' && leftThreeDays(expiredDate))
      return LEFT_3_DAYS_COLOR;

    return DEFAULT_COLOR;
  };

  return (
    <View
      style={tw.style(
        `${activeColor()} rounded-lg justify-center items-center flex-row border h-8 
        ${expired(expiredDate) ? 'pr-2.5 pl-1.5' : 'px-2.5'}`,
        {
          shadowColor: '#333',
          shadowOffset: { height: 1, width: 0 },
          shadowOpacity: 0.3,
          shadowRadius: 2,
        }
      )}
    >
      {expired(expiredDate) && (
        <Icon
          name='exclamation-thick'
          type='MaterialCommunityIcons'
          color='red'
          size={16}
        />
      )}

      <Text style={tw`text-center ${activeColor()}`}>
        {cutLetter(food.name, 10)}
      </Text>
    </View>
  );
}
