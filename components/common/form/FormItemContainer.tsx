import { View } from 'react-native';
import { Text } from '../../native-component';
import { ReactNode } from 'react';
import { scaleH } from '../../../util';
import tw from 'twrnc';

interface Props {
  label: string;
  children: ReactNode;
}

export default function FormItemContainer({ label, children }: Props) {
  return (
    <View style={tw`justify-start flex-1`}>
      <Text style={tw`text-indigo-500 mb-1`}>{label}</Text>
      {children}
    </View>
  );
}
