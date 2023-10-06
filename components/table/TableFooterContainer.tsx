import { ReactNode } from 'react';
import { View } from 'react-native';
import tw from 'twrnc';

interface Props {
  children: ReactNode;
}

export default function TableFooterContainer({ children }: Props) {
  return (
    <View
      style={tw.style(
        `bg-blue-100 border border-blue-300 rounded-t-2xl -mx-4 -mb-4`,
        {
          shadowColor: '#aaa',
          shadowOpacity: 0.3,
          shadowRadius: 10,
          shadowOffset: { height: -13, width: 0 },
        }
      )}
    >
      {children}
    </View>
  );
}
