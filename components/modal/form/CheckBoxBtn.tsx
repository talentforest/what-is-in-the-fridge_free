import Icon from 'react-native-vector-icons/Ionicons';
import { Text, TouchableOpacity } from '../../native-component';

import tw from 'twrnc';
import { INACTIVE_COLOR, ORANGE_RED } from '../../../constant/colors';

interface Props {
  onPress: () => void;
  check: boolean;
  title: string;
}

export default function CheckBoxBtn({ onPress, check, title }: Props) {
  return (
    <TouchableOpacity style={tw`flex-row items-center gap-1`} onPress={onPress}>
      <Icon
        name={check ? 'checkbox-outline' : 'square-outline'}
        color={check ? ORANGE_RED : INACTIVE_COLOR}
        size={18}
      />
      <Text styletw={`${check ? 'text-slate-900' : 'text-slate-500'}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
