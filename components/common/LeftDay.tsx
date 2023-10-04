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

  const attentionDate = expired(expiredDate) || leftThreeDays(expiredDate);

  return (
    <View>
      <View style={tw`flex-row items-center self-end`}>
        {attentionDate && iconMark && (
          <Icon
            name='exclamation-thick'
            type='MaterialCommunityIcons'
            color={getColorByLeftDay(expiredDate)}
            size={size}
          />
        )}

        {!attentionDate && iconMark && (
          <Icon
            name='menu-right-outline'
            type='MaterialCommunityIcons'
            color={getColorByLeftDay(expiredDate)}
            size={size + 2}
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
        <Text style={tw`text-[10px] self-end text-slate-500 -my-1.5`}>
          {getFormattedDate(expiredDate, 'YYYY.MM.DD')}
        </Text>
      )}
    </View>
  );
}

export default LeftDay;
