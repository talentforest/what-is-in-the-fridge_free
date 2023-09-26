import { ReactNode } from 'react';
import { View } from 'react-native';
import tw from 'twrnc';

interface Props {
  children: ReactNode;
}

export default function CompartmentContainer({ children }: Props) {
  return (
    <View
      style={tw`bg-stone-300 border border-stone-400 p-2.5 gap-2.5 flex-1 w-full m-auto self-center justify-center rounded-lg`}
    >
      {children}
    </View>
  );
}
