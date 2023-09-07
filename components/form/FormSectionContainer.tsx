import { ReactNode } from 'react';
import { View } from 'react-native';
import tw from 'twrnc';

interface Props {
  children: ReactNode;
}

export default function FormSectionContainer({ children }: Props) {
  return <View style={tw`w-full gap-5 py-2 px-6`}>{children}</View>;
}
