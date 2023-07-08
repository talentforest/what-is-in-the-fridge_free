import { ReactNode } from 'react';
import { View } from 'react-native';
import tw from 'twrnc';

interface Props {
  children: ReactNode;
  bgColor: string;
}

export default function Box({ children, bgColor = 'bg-indigo-500' }: Props) {
  return (
    <View
      style={tw`flex-1 mb-5 border-2 border-blue-200 p-4 ${bgColor} rounded-xl`}
    >
      {children}
    </View>
  );
}
