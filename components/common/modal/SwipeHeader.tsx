import { View } from 'react-native';
import { Text } from '../../native-component';
import tw from 'twrnc';

interface Props {
  title?: string;
}

export default function SwipeHeader({ title }: Props) {
  return (
    <View
      style={tw`bg-white rounded-t-2xl border-b-2 border-slate-300 px-4 py-3`}
    >
      <View style={tw`mb-5 bg-slate-400 w-12 self-center h-2 rounded-2xl`} />
      {title && (
        <Text style={tw`p-2 pb-0`} fontSize={18}>
          {title}
        </Text>
      )}
    </View>
  );
}
