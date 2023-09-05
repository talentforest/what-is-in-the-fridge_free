import { View } from 'react-native';
import { Text } from '../../components/common/native-component';
import { GRAY } from '../../constant/colors';

import Icon from '../../components/common/native-component/Icon';
import tw from 'twrnc';

interface Props {
  desc: string;
}

export default function MessageBox({ desc }: Props) {
  return (
    <View style={tw`flex-row items-center gap-1`}>
      <Icon
        type='MaterialCommunityIcons'
        name='message-outline'
        size={14}
        color={GRAY}
      />
      <Text style={tw`text-sm text-slate-500`}>{desc}</Text>
    </View>
  );
}
