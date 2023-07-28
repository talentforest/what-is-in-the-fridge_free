import { View } from 'react-native';
import { Text, TouchableOpacity } from '../../native-component';
import { DEEP_INDIGO, INACTIVE_COLOR } from '../../../constant/colors';
import { Filter } from './TableFilters';
import { scaleH } from '../../../util';
import CheckBox from '../boxes/CheckBox';
import tw from 'twrnc';

interface Props {
  title: string;
  listLength: number;
  entireChecked: boolean;
  onEntirePress: () => void;
  columnTitle: '추가' | '유통기한' | Filter;
}

export default function TableHeader({
  title,
  listLength,
  entireChecked,
  onEntirePress,
  columnTitle,
}: Props) {
  return (
    <View
      style={tw`h-[${scaleH(46)}px]
      -mx-4 px-4 gap-2 border-b-2 border-slate-300 flex-row items-center justify-between`}
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
      <View style={tw`justify-end flex-row items-center gap-0.5 rounded-full`}>
        <Text style={tw`text-slate-600`}>{columnTitle}</Text>
      </View>
    </View>
  );
}
