import { getDiffDate, getFormattedDate, getTWColorByLeftDay } from '../../util';
import { Text } from './native-component';
import { View } from 'react-native';
import tw from 'twrnc';

interface Props {
  expiredDate: string;
  size?: 14 | 15;
  dateMark?: boolean;
}

function LeftDay({ size = 15, expiredDate, dateMark }: Props) {
  const textColor = getTWColorByLeftDay(expiredDate);
  const diffDate = getDiffDate(expiredDate);

  const suffix = 0 > diffDate ? '지남' : '남음';

  const relativeTimeSuffix = `${Math.abs(diffDate)}일 ${suffix}`;

  return (
    <View>
      <Text
        style={tw.style(`self-end ${textColor} text-[${size}px]`, {
          lineHeight: size === 14 ? 20 : 22,
        })}
      >
        {diffDate === 0 ? '오늘까지' : relativeTimeSuffix}
      </Text>

      {dateMark && (
        <Text
          style={tw.style(`text-[13px] self-end text-slate-500 -mt-0.5`, {
            lineHeight: 18,
          })}
        >
          {getFormattedDate(expiredDate, 'YY.MM.DD')}
        </Text>
      )}
    </View>
  );
}

export default LeftDay;
