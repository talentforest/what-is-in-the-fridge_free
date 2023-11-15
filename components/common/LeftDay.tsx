import { getDiffDate, getFormattedDate, getTWColorByLeftDay } from '../../util';
import { Text } from './native-component';
import { View } from 'react-native';
import tw from 'twrnc';

interface Props {
  expiredDate: string;
  dateMark?: boolean;
}

function LeftDay({ expiredDate, dateMark }: Props) {
  const textColor = getTWColorByLeftDay(expiredDate);
  const diffDate = getDiffDate(expiredDate);

  const suffix = 0 > diffDate ? '지남' : '남음';

  const relativeTimeSuffix = `${Math.abs(diffDate)}일 ${suffix}`;

  return (
    <View style={tw`items-end justify-center`}>
      <Text fontSize={15} style={tw.style(`${textColor}`)}>
        {diffDate === 0 ? '오늘까지' : relativeTimeSuffix}
      </Text>

      {dateMark && (
        <Text fontSize={14} style={tw.style(`text-slate-500 -mt-0.5`)}>
          {getFormattedDate(expiredDate, 'YY.MM.DD')}
        </Text>
      )}
    </View>
  );
}

export default LeftDay;
