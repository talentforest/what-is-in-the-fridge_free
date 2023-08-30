import { ReactNode } from 'react';
import { View } from 'react-native';
import tw from 'twrnc';

export const BG_COLOR = 'bg-[#f5f5f5]';

export default function Container({ children }: { children: ReactNode }) {
  return <View style={tw`flex-1 p-4 ${BG_COLOR}`}>{children}</View>;
}
