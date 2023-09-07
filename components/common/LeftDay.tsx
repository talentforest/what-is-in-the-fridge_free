import {
  getDiffDate,
  getRelativeTime,
  getTextColorByLeftDay,
  leftThreeDays,
} from '../../util';
import { Text } from './native-component';
import { View } from 'react-native';
import { RED } from '../../constant/colors';

import Icon from './native-component/Icon';
import tw from 'twrnc';
import { useRoute } from '@react-navigation/native';

interface Props {
  expiredDate: string;
  size: number;
  mark?: boolean;
}

function LeftDay({ expiredDate, size = 14, mark }: Props) {
  const route = useRoute();
  const textColor = getTextColorByLeftDay(expiredDate);

  const relativeDate = getDiffDate(expiredDate);

  return (
    <View>
      {relativeDate === '오늘' ? (
        <Text style={tw`text-slate-600 text-[${size}px] ${textColor}`}>
          {relativeDate}
        </Text>
      ) : relativeDate < 0 ? (
        <View style={tw`flex-row items-center`}>
          {mark && (
            <Icon
              name='minus'
              type='MaterialCommunityIcons'
              color={RED}
              size={size - 2}
            />
          )}
          <Text style={tw`${textColor} text-[${size}px]`}>
            {Math.abs(relativeDate)}일
          </Text>
        </View>
      ) : (
        <View style={tw`flex-row items-center`}>
          {route.name === 'ExpiredFoods' && mark && (
            <Icon
              name='plus'
              type='MaterialCommunityIcons'
              color={leftThreeDays(expiredDate) ? 'amber' : 'green'}
              size={size + 3}
            />
          )}
          <Text style={tw`${textColor} text-[${size}px]`}>
            {relativeDate + 1}일
          </Text>
        </View>
      )}
    </View>
  );
}

export default LeftDay;
