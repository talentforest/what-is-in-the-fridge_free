import { View } from 'react-native';
import { Text } from '../../native-component';
import { ReactNode } from 'react';
import tw from 'twrnc';
import { scaleH } from '../../../util';

interface Props {
  label: string;
  children: ReactNode;
}

export default function FormItemContainer({ label, children }: Props) {
  return (
    <View style={tw`justify-between mb-[${scaleH(24)}] flex-1`}>
      <Text style={tw`text-indigo-500 mb-2`}>{label}</Text>
      {children}
    </View>
  );
}
