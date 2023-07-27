import { View } from 'react-native';
import { Text, TouchableOpacity } from '../../native-component';
import { DEEP_INDIGO, INACTIVE_COLOR } from '../../../constant/colors';
import { scaleH } from '../../../util';
import { ReactNode } from 'react';
import Icon from '../../native-component/Icon';
import tw from 'twrnc';
import CheckBox from '../Box/CheckBox';

interface Props {
  title: string;
  listLength: number;
  entireChecked: boolean;
  onEntirePress: () => void;
  children: ReactNode;
}

export default function TableLabel({
  title,
  listLength,
  entireChecked,
  onEntirePress,
  children,
}: Props) {
  return (
    <View
      style={tw`h-[${scaleH(
        46
      )}px] -mx-4 px-4 gap-2 border-b-2 border-slate-300 flex-row items-center justify-between`}
    >
      <TouchableOpacity onPress={onEntirePress}>
        <CheckBox
          checked={entireChecked}
          activeColor={entireChecked ? DEEP_INDIGO : INACTIVE_COLOR}
        />
      </TouchableOpacity>
      <View style={tw`flex-row flex-1 gap-2.5 items-center`}>
        <Text style={tw`text-slate-600`}>{title}</Text>
        <Text fontSize={12} style={tw`text-slate-600`}>
          |
        </Text>
        <Text style={tw`text-slate-600`}>{listLength}개</Text>
      </View>
      {children}
    </View>
  );
}
