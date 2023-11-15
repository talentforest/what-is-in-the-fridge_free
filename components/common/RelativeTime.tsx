import { View } from 'react-native';
import { Text } from './native-component';
import {
  getColorByLeftDay,
  getRelativeTime,
  getTWColorByLeftDay,
} from '../../util';
import Icon from './native-component/Icon';
import tw from 'twrnc';

export default function RelativeTime({ date }: { date: string }) {
  return (
    <View style={tw`gap-0.5 h-10 w-19 flex-row items-center`}>
      <Icon
        name='arrow-right'
        type='Octicons'
        size={16}
        color={getColorByLeftDay(date)}
      />

      <Text fontSize={16} style={tw`${getTWColorByLeftDay(date)}`}>
        {getRelativeTime(date)}까지
      </Text>
    </View>
  );
}
