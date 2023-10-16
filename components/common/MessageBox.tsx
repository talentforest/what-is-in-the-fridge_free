import { View } from 'react-native';
import { Text } from './native-component';
import Icon from './native-component/Icon';
import tw from 'twrnc';

interface Props {
  message: string;
  color?: 'gray' | 'red' | 'green' | 'indigo';
}

export default function MessageBox({ message, color = 'gray' }: Props) {
  return (
    <View style={tw`flex-row w-full items-start gap-1`}>
      <View style={tw`mt-1`}>
        <Icon
          type='Ionicons'
          name='chatbox-ellipses-outline'
          size={15}
          color={color}
        />
      </View>
      <Text style={tw`text-sm text-${color}-600 flex-1`}>{message}</Text>
    </View>
  );
}
