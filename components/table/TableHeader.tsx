import { ReactNode } from 'react';
import { View } from 'react-native';
import { Text, TouchableOpacity } from '../common/native-component';
import { BLUE, GRAY } from '../../constant/colors';
import { BoxColor } from '../../screen-component/home/EntranceBox';

import CheckBox from '../common/CheckBox';
import tw from 'twrnc';

interface Props {
  title: string;
  entireChecked: boolean;
  onEntirePress: () => void;
  children?: ReactNode;
  color: BoxColor;
  length: number;
}

export default function TableHeader({
  title,
  entireChecked,
  onEntirePress,
  children,
  color,
  length,
}: Props) {
  return (
    <View
      style={tw`px-3 py-2 h-10 gap-3 flex-row items-center justify-between`}
    >
      <View style={tw`gap-1 flex-row items-center flex-1`}>
        <TouchableOpacity onPress={onEntirePress}>
          <CheckBox
            checked={entireChecked}
            activeColor={entireChecked ? BLUE : GRAY}
          />
        </TouchableOpacity>

        <View style={tw`flex-1 flex-row gap-1.5 items-center`}>
          <Text style={tw`text-${color}-700 text-sm`}>{title}</Text>
          <Text style={tw`text-${color}-700 flex-1 text-xs self-end`}>
            {length}개
          </Text>
        </View>
      </View>

      {children}
    </View>
  );
}
