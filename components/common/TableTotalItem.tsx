import { View } from 'react-native';
import { Text, TouchableOpacity } from '../native-component';
import { DEEP_INDIGO, INACTIVE_COLOR } from '../../constant/colors';
import { Food } from '../../constant/foods';
import { scaleH } from '../../util';
import tw from 'twrnc';
import Icon from '../native-component/Icon';
import CheckBox from './CheckBox';

interface Props {
  list: Food[];
  entireCheck: boolean;
  onEntirePress: (list: Food[]) => void;
}

export default function TableTotalItem({
  entireCheck,
  onEntirePress,
  list,
}: Props) {
  return (
    <View
      style={tw`h-[${scaleH(
        43
      )}px] border-t border-slate-300 flex-row items-center gap-2`}
    >
      <TouchableOpacity
        onPress={() => onEntirePress(list)}
        style={tw`justify-center flex-row items-center gap-2`}
      >
        <CheckBox checked={!entireCheck} activeColor={DEEP_INDIGO} />
        <Text style={tw`text-indigo-500`}>
          전체 <Text style={tw`text-orange-600`}>{list.length}</Text>개 선택하기
        </Text>
      </TouchableOpacity>
    </View>
  );
}
