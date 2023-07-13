import { View } from 'react-native';
import { Text } from '../../native-component';
import { DEEP_INDIGO } from '../../../constant/colors';
import { scaleH } from '../../../util';
import tw from 'twrnc';
import Icon from '../../native-component/Icon';

interface Props {
  title: string;
  label: string;
}

export default function TableLabel({ title, label }: Props) {
  return (
    <View
      style={tw`h-[${scaleH(
        43
      )}px] -mx-4 px-4 gap-2 bg-amber-200 rounded-t-sm border-b border-slate-300 flex-row items-center justify-between`}
    >
      <Icon type='Feather' name='list' size={18} color={DEEP_INDIGO} />
      <Text style={tw`text-slate-600`}>{title}</Text>
      <View style={tw`flex-1 w-22 justify-end items-end`}>
        <Text style={tw`text-slate-600`}>{label}</Text>
      </View>
    </View>
  );
}
