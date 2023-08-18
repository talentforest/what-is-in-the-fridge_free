import { View } from 'react-native';
import { Text, TouchableOpacity } from '../../native-component';
import { DEEP_INDIGO, INACTIVE_COLOR } from '../../../constant/colors';
import { FavoriteFoodsFilter } from '../../../hooks/useTableItemFilter';
import CheckBox from '../boxes/CheckBox';
import tw from 'twrnc';

interface Props {
  title: string;
  entireChecked: boolean;
  onEntirePress: () => void;
  columnTitle: '추가' | '유통기한순' | FavoriteFoodsFilter;
}

export default function TableHeader({
  title,
  entireChecked,
  onEntirePress,
  columnTitle,
}: Props) {
  return (
    <View
      style={tw`
      -mx-2 px-4 pt-3 gap-1 border-slate-300 rounded-t-lg flex-row items-center justify-between`}
    >
      <TouchableOpacity onPress={onEntirePress}>
        <CheckBox
          checked={entireChecked}
          activeColor={entireChecked ? DEEP_INDIGO : INACTIVE_COLOR}
        />
      </TouchableOpacity>
      <Text style={tw`text-slate-800 flex-1`}>{title}</Text>
      <View style={tw`justify-end flex-row items-center gap-0.5 rounded-full`}>
        <Text style={tw`text-slate-500`}>{columnTitle}</Text>
      </View>
    </View>
  );
}
