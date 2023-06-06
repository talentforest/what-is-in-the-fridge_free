import { View } from 'react-native';
import { Text, TouchableOpacity } from '../native-component';
import { DEEP_INDIGO } from '../../constant/colors';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/Feather';

interface Props {
  title: '식료품';
  label: string;
}

export default function TableLabel({ title, label }: Props) {
  return (
    <View
      style={tw`h-12 -mx-4 px-4 gap-2 border-b border-slate-300 flex-row items-center justify-between`}
    >
      <Icon name='list' size={18} color={DEEP_INDIGO} />
      <Text styletw='text-indigo-500'>{title}</Text>
      <View style={tw`flex-1 w-22 justify-end items-end`}>
        <Text styletw='text-indigo-500'>{label}</Text>
      </View>
    </View>
  );
}
