import { ReactNode } from 'react';
import { View } from 'react-native';
import tw from 'twrnc';
import { shadowStyle } from '../../constant/shadowStyle';

interface Props {
  children: ReactNode;
}

export default function CompartmentContainer({ children }: Props) {
  return (
    <View
      style={tw.style(
        `bg-stone-200 border border-stone-300 p-2.5 gap-2.5 flex-1 w-full m-auto self-center justify-center rounded-lg`,
        shadowStyle(4)
      )}
    >
      {children}
    </View>
  );
}
