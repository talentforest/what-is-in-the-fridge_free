import { ReactNode } from 'react';
import { View, useWindowDimensions } from 'react-native';
import { BGCOLOR_DEFAULT } from '../../constant/colors';
import tw from 'twrnc';

export const BG_COLOR = `bg-[${BGCOLOR_DEFAULT}]`;

interface Props {
  children: ReactNode;
  bgColor?: string;
}

export default function Container({ children, bgColor }: Props) {
  const { height } = useWindowDimensions();

  const paddingValue = height > 1000 ? 6 : 4;

  return (
    <View
      style={tw`flex-1 bg-[${bgColor || BGCOLOR_DEFAULT}] px-${paddingValue} 
       pb-${paddingValue - 1}`}
    >
      {children}
    </View>
  );
}
