import { View } from 'react-native';
import { Text } from '../common/native-component';
import tw from 'twrnc';

interface Props {
  message: string;
  color: 'green' | 'orange';
}

export default function FormMessage({ message, color }: Props) {
  return (
    <View style={tw`flex-row items-start mt-1`}>
      <Text style={tw`text-${color}-600 flex-1 text-xs`}>{message}</Text>
    </View>
  );
}
