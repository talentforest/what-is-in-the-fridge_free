import { SafeAreaView } from 'react-native-safe-area-context';
import { BG_COLOR } from '../Container';
import tw from 'twrnc';

export function SafeBottomAreaView({ ...props }) {
  return (
    <SafeAreaView
      edges={['bottom']}
      style={tw`flex-1 ${BG_COLOR}`}
      {...props}
    />
  );
}
