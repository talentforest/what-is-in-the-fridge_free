import { ReactNode } from 'react';
import { View } from 'react-native';
import tw from 'twrnc';

interface Props {
  children: ReactNode;
}

export default function FormSectionContainer({ children }: Props) {
  return <View style={tw`w-full gap-3`}>{children}</View>;
}
