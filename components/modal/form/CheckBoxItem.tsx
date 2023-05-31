import { Text, TouchableOpacity } from '../../native-component';
import { INACTIVE_COLOR, ORANGE_RED } from '../../../constant/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import tw from 'twrnc';

interface Props {
  onPress: () => void;
  check: boolean;
  title: string;
}

export default function CheckBoxItem({ onPress, check, title }: Props) {
  return (
    <TouchableOpacity style={tw`flex-row items-center gap-1`} onPress={onPress}>
      <Icon
        name={check ? 'checkbox-outline' : 'square-outline'}
        color={check ? ORANGE_RED : INACTIVE_COLOR}
        size={18}
      />
      <Text styletw={`text-sm ${check ? 'text-slate-900' : 'text-slate-500'}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
