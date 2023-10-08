import { getDiffDate, getFormattedDate, getTWColorByLeftDay } from '../../util';
import { Text } from './native-component';
import { View } from 'react-native';
import ExpiredExclamation from './ExpiredExclamation';
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
      <View style={tw`flex-row items-center self-end`}>
        {iconMark && <ExpiredExclamation expiredDate={expiredDate} size={14} />}
        <Text style={tw`${textColor} text-[${size}px] self-end`}>
          {diffDate === 0
            ? '오늘까지'
            : `${Math.abs(diffDate).toFixed(0)}일 ${
                0 > diffDate ? '지남' : '남음'
              }`}
        </Text>
      </View>

      {dateMark && (
        <Text style={tw`text-xs py-0 self-end text-slate-500 -mt-1`}>
          {getFormattedDate(expiredDate, 'YY.MM.DD')}
        </Text>
      )}
    </View>
  );
}

export default LeftDay;
