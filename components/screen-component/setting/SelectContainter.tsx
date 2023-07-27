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
    <View style={tw`mb-[${scaleH(26)}px]`}>
      <Text style={tw`text-slate-600 pb-3`}>{title}</Text>
      <View
        style={tw`gap-2 rounded-lg  ${
          title === '3. 각 공간의 칸 개수'
            ? ''
            : `p-[${scaleH(16)}px] bg-white border border-slate-300`
        }`}
      >
        {children}
      </View>
    </View>
  );
}
