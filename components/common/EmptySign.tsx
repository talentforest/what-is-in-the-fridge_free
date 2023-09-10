import { View } from 'react-native';
import { Text } from './native-component';
import tw from 'twrnc';

interface Props {
  message: string;
}

export default function EmptySign({ message }: Props) {
  const splittedMessage = message.split(', ');

  return (
    <View style={tw``}>
      <Text style={tw`text-sm text-slate-400 text-center`}>
        {splittedMessage[0]}
      </Text>
      {message[1] && (
        <Text style={tw`text-sm text-slate-400 text-center`}>
          {splittedMessage[1]}
        </Text>
      )}
    </View>
  );
}
