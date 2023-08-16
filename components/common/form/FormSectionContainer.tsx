import { ReactNode } from 'react';
import { View } from 'react-native';
import tw from 'twrnc';

export default function FormSectionContainer({
  children,
}: {
  children: ReactNode;
}) {
  return <View style={tw`w-full gap-7 px-2`}>{children}</View>;
}
