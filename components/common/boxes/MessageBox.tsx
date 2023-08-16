import { View } from 'react-native';
import { INDIGO } from '../../../constant/colors';
import { Text } from '../../native-component';
import Icon from '../../native-component/Icon';
import tw from 'twrnc';

interface Props {
  message: string;
  color:
    | 'text-red-600'
    | 'text-orange-600'
    | 'text-green-700'
    | 'text-blue-600';
}

export default function MessageBox({ message, color }: Props) {
  return (
    <View style={tw`flex-row items-center gap-1 h-full`}>
      <Icon name='message1' type='AntDesign' size={12} color={INDIGO} />
      <Text style={tw`${color}`} fontSize={12}>
        {message}
      </Text>
    </View>
  );
}
