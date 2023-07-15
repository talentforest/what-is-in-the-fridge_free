import { View } from 'react-native';
import { Text, TouchableOpacity } from '../../native-component';
import { DEEP_INDIGO, INACTIVE_COLOR, INDIGO } from '../../../constant/colors';
import { scaleH } from '../../../util';
import { ReactNode } from 'react';
import Icon from '../../native-component/Icon';
import tw from 'twrnc';

interface Props {
  title: string;
  entireChecked: boolean;
  onEntirePress: () => void;
  children: ReactNode;
}

export default function TableLabel({
  title,
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
        <Icon
          type='MaterialCommunityIcons'
          name={entireChecked ? 'checkbox-marked' : 'square-outline'}
          size={18}
          color={entireChecked ? DEEP_INDIGO : INACTIVE_COLOR}
        />
      </TouchableOpacity>
      <Text style={tw`text-slate-600 flex-1`}>{title}</Text>
      {children}
    </View>
  );
}
