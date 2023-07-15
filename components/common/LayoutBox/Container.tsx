import { ReactNode } from 'react';
import { View } from 'react-native';
import { scaleH } from '../../../util';
import tw from 'twrnc';
import { useRoute } from '@react-navigation/native';

export default function Container({ children }: { children: ReactNode }) {
  const route = useRoute();
  return (
    <View
      style={tw`flex-1 p-[${scaleH(14)}px] ${
        route.name === 'Setting' ? 'bg-white' : 'bg-blue-50'
      }`}
    >
      {children}
    </View>
  );
}
