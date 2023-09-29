import {
  expired,
  getColorByLeftDay,
  getDiffDate,
  getFormattedDate,
  getTWColorByLeftDay,
  leftThreeDays,
} from '../../util';
import { Text } from './native-component';
import { View } from 'react-native';
import Icon from './native-component/Icon';
import tw from 'twrnc';

interface Props {
  expiredDate: string;
  size?: number;
  iconMark?: boolean;
  dateMark?: boolean;
}

function LeftDay({ size = 15, expiredDate, iconMark, dateMark }: Props) {
  const textColor = getTWColorByLeftDay(expiredDate);
  const diffDate = getDiffDate(expiredDate);

  return (
    <View>
      <View
        style={tw`${
          (expired(expiredDate) || leftThreeDays(expiredDate)) && iconMark
            ? 'flex-row items-center'
            : ''
        }`}
      >
        {expired(expiredDate) && iconMark && (
          <Icon
            name='exclamation-thick'
            type='MaterialCommunityIcons'
            color={getColorByLeftDay(expiredDate)}
            size={size}
          />
        )}

        {leftThreeDays(expiredDate) && iconMark && (
          <Icon
            name='circle-medium'
            type='MaterialCommunityIcons'
            color={getColorByLeftDay(expiredDate)}
            size={size}
          />
        )}

        <Text style={tw`${textColor} text-[${size}px] self-end`}>
          {diffDate === 0
            ? '오늘까지'
            : `${Math.abs(diffDate).toFixed(0)}일 ${
                0 > diffDate ? '지남' : '남음'
              }`}
        </Text>
      </View>

      {dateMark && (
        <Text style={tw`text-[11px] self-end text-slate-500 -my-1`}>
          {getFormattedDate(expiredDate, 'YYYY.MM.DD')}
        </Text>
      )}
    </View>
  );
}

export default LeftDay;
