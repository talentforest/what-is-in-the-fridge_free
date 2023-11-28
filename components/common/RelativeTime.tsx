import { View } from 'react-native';
import { Text } from './native-component';
import {
  getColorByLeftDay,
  getRelativeTime,
  getTWColorByLeftDay,
} from '../../util';
import IconChevronsRight from '../svg/arrow/IconChevronsRight';
import tw from 'twrnc';

export default function RelativeTime({ date }: { date: string }) {
  return (
    <View style={tw`gap-0.5 h-10 flex-row items-center`}>
      <IconChevronsRight size={16} color={getColorByLeftDay(date)} />

      <Text fontSize={15} style={tw`${getTWColorByLeftDay(date)}`}>
        {getRelativeTime(date)}까지
      </Text>
    </View>
  );
}
