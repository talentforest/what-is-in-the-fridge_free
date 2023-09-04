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
    <View style={tw`pr-3 h-10 gap-3 flex-row items-center justify-between`}>
      <TouchableOpacity style={tw`flex-1 py-2 pl-3`} onPress={onEntirePress}>
        <View style={tw`gap-1 flex-row items-center flex-1`}>
          <CheckBox
            checked={entireChecked}
            activeColor={entireChecked ? BLUE : GRAY}
          />
          <View style={tw`flex-1 flex-row gap-1.5 items-center`}>
            <Text style={tw`text-${color}-700 text-sm`}>{title}</Text>
            <Text style={tw`text-${color}-700 flex-1 text-xs self-end`}>
              {length}개
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      {children}
    </View>
  );
}
