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
    <View style={tw`flex-row w-full items-center gap-1`}>
      <Icon
        type='MaterialCommunityIcons'
        name='comment-processing-outline'
        size={14}
        color={color}
      />
      <Text style={tw`text-${color}-500 flex-1`}>{message}</Text>
    </View>
  );
}
