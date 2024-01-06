import { SafeAreaView } from 'react-native-safe-area-context';
import { TAB_BLUE_BG_COLOR } from '../../../constant/colors';
import { BG_COLOR } from '../Container';
import { useRouteName } from '../../../hooks';
import tw from 'twrnc';

export function SafeBottomAreaView({ ...props }) {
  const { routeCompartments } = useRouteName();

  const bgColor = routeCompartments ? `bg-[${TAB_BLUE_BG_COLOR}]` : BG_COLOR;

  return (
    <SafeAreaView edges={['bottom']} style={tw`flex-1 ${bgColor}`} {...props} />
  );
}
