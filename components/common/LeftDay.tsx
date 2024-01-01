import { useSelector } from '../../redux/hook';
import { getDiffDate, getFormattedDate, getTWColorByLeftDay } from '../../util';
import { Text } from './native-component';
import { View } from 'react-native';
import tw from 'twrnc';

interface Props {
  expiredDate: string;
  dateMark?: boolean;
  isSuffix?: boolean;
}

function LeftDay({ expiredDate, dateMark, isSuffix }: Props) {
  const { fontFamily } = useSelector((state) => state.fontFamily);
  const textColor = getTWColorByLeftDay(expiredDate);
  const diffDate = getDiffDate(expiredDate);

  const suffix = 0 > diffDate ? '지남' : '남음';

  const today = isSuffix ? '오늘까지' : '오늘';

  const relativeTime = isSuffix
    ? `${Math.abs(diffDate)}일 ${suffix}`
    : `${diffDate > 0 ? '+' : ''}${diffDate}일`;

  return (
    <View style={tw`items-end justify-center gap-0.2`}>
      {expiredDate !== '' ? (
        <>
          <Text fontSize={16} style={tw.style(`${textColor}`)}>
            {diffDate === 0 ? today : relativeTime}
          </Text>

          {dateMark && (
            <Text fontSize={14} style={tw.style(`text-slate-500`)}>
              {getFormattedDate(expiredDate, 'YY.MM.DD')}
            </Text>
          )}
        </>
      ) : (
        <Text fontSize={16} style={tw.style(`text-slate-400`)}>
          정보 없음
        </Text>
      )}
    </View>
  );
}

export default LeftDay;
