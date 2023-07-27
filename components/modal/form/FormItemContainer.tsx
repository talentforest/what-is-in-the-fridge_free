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
    <View style={tw`justify-start mb-[${scaleH(26)}]`}>
      <Text style={tw`text-slate-600 mb-1`}>{label}</Text>
      {children}
    </View>
  );
}
