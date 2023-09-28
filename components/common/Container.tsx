import { useRoute } from '@react-navigation/native';
import { ReactNode } from 'react';
import { View } from 'react-native';
import { TAB_BLUE_BG_COLOR } from '../../constant/colors';
import tw from 'twrnc';

export const BG_COLOR = 'bg-[#f5f5f5]';

export default function Container({ children }: { children: ReactNode }) {
  const route = useRoute();
  const bgColor =
    route.name === 'Compartments' ? `bg-[${TAB_BLUE_BG_COLOR}]` : BG_COLOR;

  return <View style={tw`flex-1 px-4 py-3 ${bgColor}`}>{children}</View>;
}
