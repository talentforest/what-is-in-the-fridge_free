import { View } from 'react-native';
import { Text } from '../native-component';
import { DEEP_INDIGO } from '../../constant/colors';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/Feather';

interface Props {
  title: '냉동실 식료품' | '냉장실 식료품' | '식료품';
  label: string;
}

export default function TableLabel({ title, label }: Props) {
  return (
    <View
      style={tw`h-12 -mx-4 px-4 gap-2 border-b border-slate-300 flex-row items-center justify-between`}
    >
      <Icon name='list' size={18} color={DEEP_INDIGO} />
      <Text styletw='flex-1 text-indigo-500'>{title}</Text>
      <View style={tw`w-22 justify-end items-end`}>
        <Text styletw='text-indigo-500'>{label}</Text>
      </View>
    </View>
  );
}
