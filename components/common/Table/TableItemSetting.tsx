import { View } from 'react-native';
import { Text, TouchableOpacity } from '../../native-component';
import { Food } from '../../../constant/foods';
import { scaleH } from '../../../util';
import { DEEP_INDIGO, LIGHT_GRAY } from '../../../constant/colors';
import tw from 'twrnc';
import Icon from '../../native-component/Icon';

interface Props {
  list: Food[];
  onPress: () => void;
}

export default function TableItemSetting({ list, onPress }: Props) {
  return (
    <View
      style={tw`h-[${scaleH(
        48
      )}px] border-t border-slate-300 flex-row items-center justify-between gap-2`}
    >
      <Text style={tw`text-indigo-500`}>{list.length}개의 식료품 선택</Text>
      <TouchableOpacity onPress={onPress} style={tw`p-0.5`}>
        <Icon
          type='MaterialCommunityIcons'
          name='trash-can'
          size={20}
          color={list.length ? DEEP_INDIGO : LIGHT_GRAY}
        />
      </TouchableOpacity>
    </View>
  );
}
