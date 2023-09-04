import { SafeAreaView } from 'react-native-safe-area-context';
import { BG_COLOR } from '../Container';
import { useRoute } from '@react-navigation/native';
import { HEADER_BGCOLOR } from '../../../constant/colors';
import tw from 'twrnc';

export function SafeBottomAreaView({ ...props }) {
  const route = useRoute();
  const bgColor =
    route.name === 'Compartments' ? `bg-[${HEADER_BGCOLOR}]` : BG_COLOR;

  return (
    <SafeAreaView edges={['bottom']} style={tw`flex-1 ${bgColor}`} {...props} />
  );
}
