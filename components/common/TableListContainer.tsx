import { View } from 'react-native';
import { ReactNode } from 'react';
import tw from 'twrnc';

interface Props {
  children: ReactNode;
}

export default function TableListContainer({ children }: Props) {
  return (
    <View style={tw`border-b border-slate-400 px-4 bg-white`}>{children}</View>
  );
}
