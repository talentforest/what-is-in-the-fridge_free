import { ReactNode } from 'react';
import { View } from 'react-native';
import { shadowStyle } from '../../constant/shadowStyle';
import tw from 'twrnc';

interface Props {
  children: ReactNode;
}

export default function CompartmentContainer({ children }: Props) {
  return (
    <View
      style={tw.style(
        `bg-stone-100 border border-stone-200 p-2.5 gap-2.5 flex-1 w-full justify-center rounded-2xl`,
        shadowStyle(8)
      )}
    >
      {children}
    </View>
  );
}
