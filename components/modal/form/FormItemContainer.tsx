import { View } from 'react-native';
import { Text } from '../../native-component';
import { ReactNode } from 'react';
import tw from 'twrnc';

interface Props {
  label: string;
  children: ReactNode;
}

export default function FormItemContainer({ label, children }: Props) {
  return (
    <View style={tw`justify-between`}>
      <Text styletw='text-indigo-500 mb-2'>{label}</Text>
      {children}
    </View>
  );
}
