import { SafeAreaView as SafeArea } from 'react-native-safe-area-context';
import tw from 'twrnc';

export function SafeAreaView({ ...props }) {
  return (
    <SafeArea edges={['bottom']} style={tw`flex-1 bg-indigo-50`} {...props} />
  );
}
