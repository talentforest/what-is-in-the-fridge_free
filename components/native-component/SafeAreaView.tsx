import { SafeAreaView as SafeArea } from 'react-native-safe-area-context';
import tw from 'twrnc';

export function SafeAreaView({ ...props }) {
  return <SafeArea style={tw`flex-1`} {...props} />;
}
