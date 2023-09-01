import { View } from 'react-native';
import { Text } from './native-component';
import tw from 'twrnc';

export default function RoundedTag({ name }: { name: string }) {
  return (
    <View
      style={tw`border py-0.5 px-1.5 rounded-full bg-stone-100 border-stone-500`}
    >
      <Text style={tw`text-slate-600 text-xs`}>{name}</Text>
    </View>
  );
}
