import { ReactNode } from 'react';
import { View } from 'react-native';
import tw from 'twrnc';

export default function TableContainer({ children }: { children: ReactNode }) {
  return (
    <View style={tw`bg-white px-4 flex-1 rounded-lg border border-slate-400`}>
      {children}
    </View>
  );
}
