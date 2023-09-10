import { View } from 'react-native';
import { Text } from './native-component';
import { GRAY } from '../../constant/colors';
import Icon from './native-component/Icon';
import tw from 'twrnc';

export default function MessageBox({ message }: { message: string }) {
  return (
    <View style={tw`flex-row items-start gap-1 mb-1`}>
      <View style={tw`mt-1.4`}>
        <Icon
          type='MaterialCommunityIcons'
          name='message-outline'
          size={14}
          color={GRAY}
        />
      </View>
      <Text style={tw`text-sm text-slate-500 flex-1`}>{message}</Text>
    </View>
  );
}
