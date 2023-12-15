import { ReactNode } from 'react';
import { View, useWindowDimensions } from 'react-native';
import { TAB_BLUE_BG_COLOR } from '../../constant/colors';
import { useRouteName } from '../../hooks/useRouteName';
import tw from 'twrnc';

export const BG_COLOR = 'bg-[#f5f5f5]';

interface Props {
  children: ReactNode;
}

export default function Container({ children }: Props) {
  const { routeCompartments } = useRouteName();

  const { height } = useWindowDimensions();

  const paddingValue = height > 1000 ? 6 : 4;

  const bgColor = routeCompartments ? `bg-[${TAB_BLUE_BG_COLOR}]` : BG_COLOR;

  return (
    <View
      style={tw`flex-1 ${bgColor} px-${paddingValue} 
      py-${paddingValue - 2}`}
    >
      {children}
    </View>
  );
}
