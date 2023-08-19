import { View } from 'react-native';
import { INDIGO, ORANGE_RED } from '../../../constant/colors';
import { Text } from '../../native-component';
import Icon from '../../native-component/Icon';
import tw from 'twrnc';

interface Props {
  message: string;
}

export default function MessageBox({ message }: Props) {
  return (
    <View style={tw`flex-row items-start gap-1 pr-5 w-full h-9`}>
      <View style={tw`mt-0.5`}>
        <Icon name='message1' type='AntDesign' size={12} color={ORANGE_RED} />
      </View>
      <Text style={tw`text-amber-600`} fontSize={12}>
        {message}
      </Text>
    </View>
  );
}
