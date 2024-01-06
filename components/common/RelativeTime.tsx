import { View } from 'react-native';
import { Text } from './native-component';
import { getRelativeTime } from '../../util';
import { useGetColor } from '../../hooks';
import IconChevronsRight from '../svg/arrow/IconChevronsRight';
import tw from 'twrnc';

export default function RelativeTime({
  date,
  type,
}: {
  date: string;
  type: '소비기한' | '구매날짜';
}) {
  const { getTWColorByLeftDay, getHexColorByLeftDay } = useGetColor();

  return (
    <View style={tw`h-10 pl-1 flex-row items-center`}>
      <IconChevronsRight size={15} color={getHexColorByLeftDay(date)} />

      <Text fontSize={15} style={tw`${getTWColorByLeftDay(date)}`}>
        {getRelativeTime(date)}
        {type === '소비기한' ? '까지' : ''}
      </Text>
    </View>
  );
}
