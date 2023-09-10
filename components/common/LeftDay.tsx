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

interface Props {
  expiredDate: string;
  relative?: boolean;
  mark?: boolean;
  size?: number;
}

function LeftDay({ expiredDate, size = 14, relative, mark }: Props) {
  const textColor = getTextColorByLeftDay(expiredDate);

  const diffDate = getDiffDate(expiredDate);
  const relativeDate = getRelativeTime(expiredDate);

  return (
    <View>
      {diffDate === '오늘' ? (
        <Text style={tw`text-slate-600 text-[${size}px] ${textColor}`}>
          {diffDate}
        </Text>
      ) : diffDate < 0 ? (
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
            {relative ? `${relativeDate}` : `${Math.abs(diffDate)}일`}
          </Text>
        </View>
      ) : (
        <View style={tw`flex-row items-center`}>
          {mark && (
            <Icon
              name='plus'
              type='MaterialCommunityIcons'
              color={leftThreeDays(expiredDate) ? 'amber' : 'green'}
              size={size + 3}
            />
          )}
          <Text style={tw`${textColor} text-[${size}px]`}>
            {relative ? `${relativeDate}` : `${diffDate + 1}일`}
          </Text>
        </View>
      )}
    </View>
  );
}

export default LeftDay;
