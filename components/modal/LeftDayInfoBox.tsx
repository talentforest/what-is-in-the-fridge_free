import { View } from 'react-native';
import { Text } from '../common/native-component';
import { getFormattedDate } from '../../util';

import LeftDay from '../common/LeftDay';
import tw from 'twrnc';

interface Props {
  expiredDate: string;
}

export default function LeftDayInfoBox({ expiredDate }: Props) {
  return (
    <View style={tw`flex-row items-center gap-1`}>
      <Text style={tw`text-slate-800 mr-1.5`}>
        {getFormattedDate(expiredDate, 'YY.MM.DD')}
      </Text>

      <LeftDay expiredDate={expiredDate} size={14} iconMark />
    </View>
  );
}
