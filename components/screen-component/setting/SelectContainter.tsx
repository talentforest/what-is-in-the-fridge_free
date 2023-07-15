import { View } from 'react-native';
import { Text } from '../../native-component';
import CheckBoxItem from '../../modal/form/CheckBoxItem';
import tw from 'twrnc';
import { scaleH } from '../../../util';
import { ReactNode } from 'react';

interface Props {
  title: string;
  children: ReactNode;
}

export default function SelectContainter({ title, children }: Props) {
  return (
    <View
      style={tw`gap-1 mb-[${scaleH(
        10
      )}] border border-slate-300 p-4 rounded-lg bg-white`}
    >
      <View style={tw`border-b pb-3 border-blue-400 mb-2`}>
        <Text style={tw`text-blue-700`}>{title}</Text>
      </View>
      {children}
    </View>
  );
}
