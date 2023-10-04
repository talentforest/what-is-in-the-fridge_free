import { ReactNode } from 'react';
import { View } from 'react-native';
import tw from 'twrnc';

interface Props {
  children: ReactNode;
}

export default function TableFooterContainer({ children }: Props) {
  return (
    <View
      style={tw.style(`bg-stone-100 -mx-4 px-4 pt-2`, {
        shadowColor: '#aaa',
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: { height: -13, width: 0 },
      })}
    >
      {children}
    </View>
  );
}
