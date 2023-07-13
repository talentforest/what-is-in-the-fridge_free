import { ReactNode } from 'react';
import { View } from 'react-native';
import { scaleH } from '../../../util';
import tw from 'twrnc';

export default function Container({ children }: { children: ReactNode }) {
  return (
    <View style={tw`flex-1 p-[${scaleH(14)}px] bg-blue-50`}>{children}</View>
  );
}
