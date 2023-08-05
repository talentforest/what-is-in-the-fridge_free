import { View } from 'react-native';
import { Text, TouchableOpacity } from '../../native-component';
import { DEEP_INDIGO, INACTIVE_COLOR } from '../../../constant/colors';
import { scaleH } from '../../../util';
import { FavoriteFoodsFilter } from '../../../hooks/useTableItemFilter';
import CheckBox from '../boxes/CheckBox';
import tw from 'twrnc';

interface Props {
  title: string;
  listLength: number;
  entireChecked: boolean;
  onEntirePress: () => void;
  columnTitle: '추가' | '유통기한순' | FavoriteFoodsFilter;
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
      -mx-2 px-4 gap-1 border-b-2 border-slate-300 flex-row items-center justify-between`}
    >
      <TouchableOpacity onPress={onEntirePress}>
        <CheckBox
          checked={entireChecked}
          activeColor={entireChecked ? DEEP_INDIGO : INACTIVE_COLOR}
        />
      </TouchableOpacity>
      <View style={tw`flex-row flex-1 items-end gap-1.5`}>
        <Text style={tw`text-slate-800`}>{title}</Text>
        {listLength !== 0 && (
          <Text style={tw`text-slate-500`} fontSize={12}>
            {listLength}개
          </Text>
        )}
      </View>
      <View style={tw`justify-end flex-row items-center gap-0.5 rounded-full`}>
        <Text style={tw`text-slate-500`}>{columnTitle}</Text>
      </View>
    </View>
  );
}
