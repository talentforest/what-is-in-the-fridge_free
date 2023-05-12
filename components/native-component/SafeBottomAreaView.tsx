import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';

export function SafeBottomAreaView({ ...props }) {
  return (
    <SafeAreaView
      edges={['bottom']}
      style={tw`flex-1 bg-indigo-50`}
      {...props}
    />
  );
}
