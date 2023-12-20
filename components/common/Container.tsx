import { ReactNode } from 'react';
import { View, useWindowDimensions } from 'react-native';
import { BACKGROUND_COLOR, TAB_BLUE_BG_COLOR } from '../../constant/colors';
import { useRouteName } from '../../hooks/useRouteName';
import tw from 'twrnc';

export const BG_COLOR = `bg-[${BACKGROUND_COLOR}]`;

interface Props {
  children: ReactNode;
}

export default function Container({ children }: Props) {
  const { routeCompartments } = useRouteName();

  const { height } = useWindowDimensions();

  const paddingValue = height > 1000 ? 6 : 4;

  const backgroundColor = `bg-[${
    routeCompartments ? TAB_BLUE_BG_COLOR : BACKGROUND_COLOR
  }]`;

  return (
    <View
      style={tw`flex-1 ${backgroundColor} px-${paddingValue} 
      pt-${paddingValue - 2} pb-${paddingValue - 1}`}
    >
      {children}
    </View>
  );
}
