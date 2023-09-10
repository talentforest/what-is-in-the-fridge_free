import { View } from 'react-native';
import { Text } from '../common/native-component';
import {
  expired,
  getDiffDate,
  getFormattedDate,
  getTextColorByLeftDay,
  leftThreeDays,
} from '../../util';

import Icon from '../common/native-component/Icon';
import LeftDay from '../common/LeftDay';
import tw from 'twrnc';

interface Props {
  expiredDate: string;
}

export default function LeftDayInfoBox({ expiredDate }: Props) {
  const textColor = getTextColorByLeftDay(expiredDate);

  const attentionExpiredDate =
    expired(expiredDate) || leftThreeDays(expiredDate);

  const relativeDate = getDiffDate(expiredDate);

  return (
    <View>
      <Text style={tw`text-slate-800`}>
        {getFormattedDate(expiredDate, 'YYYY년 MM월 DD일')}
      </Text>
      <View style={tw`self-start gap-0.5 -mt-1 flex-row items-center`}>
        {attentionExpiredDate && (
          <>
            <Text style={tw`${textColor} text-[13px]`}>
              {expired(expiredDate)
                ? '유통기한 만료'
                : leftThreeDays(expiredDate)
                ? '유통기한 주의'
                : ''}
            </Text>

            <Icon
              name='circle-medium'
              type='MaterialCommunityIcons'
              size={14}
              color={expired(expiredDate) ? 'red' : 'amber'}
            />

            <LeftDay expiredDate={expiredDate} size={13} />

            {expired(expiredDate) && (
              <Text style={tw`text-[13px] ${textColor}`}>지남</Text>
            )}

            {leftThreeDays(expiredDate) &&
              getDiffDate(expiredDate) !== '오늘' && (
                <Text style={tw`text-[13px] ${textColor}`}>남음</Text>
              )}
          </>
        )}

        {!attentionExpiredDate && (
          <LeftDay expiredDate={expiredDate} relative size={13} />
        )}
      </View>
    </View>
  );
}
