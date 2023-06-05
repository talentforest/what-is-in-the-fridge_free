import { SafeAreaView } from 'react-native-safe-area-context';
import { CARROT_COLOR } from '../../constant/colors';
import tw from 'twrnc';

export function SafeBottomAreaView({ ...props }) {
  return (
    <SafeAreaView
      edges={['bottom']}
      style={tw`flex-1 bg-[${CARROT_COLOR}]`}
      {...props}
    />
  );
}
