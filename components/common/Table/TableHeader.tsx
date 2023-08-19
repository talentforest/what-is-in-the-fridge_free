import { View } from 'react-native';
import { Text, TouchableOpacity } from '../../native-component';
import { DEEP_INDIGO, INACTIVE_COLOR } from '../../../constant/colors';
import { FavoriteFoodsFilter } from '../../../hooks/useTableItemFilter';
import CheckBox from '../boxes/CheckBox';
import tw from 'twrnc';
import { useSelector } from '../../../redux/hook';

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
  const { shoppingList } = useSelector((state) => state.shoppingList);

  return (
    <View style={tw`gap-1 flex-row items-center justify-between`}>
      <TouchableOpacity onPress={onEntirePress}>
        <CheckBox
          checked={entireChecked}
          activeColor={entireChecked ? DEEP_INDIGO : INACTIVE_COLOR}
        />
      </TouchableOpacity>
      <Text style={tw`text-slate-800`}>{title}</Text>
      {title === '장봐야할 식료품' && (
        <Text style={tw`text-slate-500`}>{shoppingList.length}개</Text>
      )}
      <View
        style={tw`flex-1 justify-end flex-row items-center gap-0.5 rounded-full`}
      >
        <Text style={tw`text-slate-500`} fontSize={13}>
          {columnTitle}
        </Text>
      </View>
    </View>
  );
}
