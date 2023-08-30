import { Text, TouchableOpacity } from '../native-component';
import { BLUE } from '../../constant/colors';
import CheckBox from './CheckBox';
import tw from 'twrnc';

interface Props {
  onPress: () => void;
  checked: boolean;
  title: string;
  disabled?: boolean;
}

export default function CheckBoxItem({
  disabled,
  onPress,
  checked,
  title,
}: Props) {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={tw`flex-row items-center gap-1.5 z-30 py-1.5`}
      onPress={onPress}
    >
      <CheckBox checked={checked} activeColor={BLUE} />
      <Text style={tw`${checked ? 'text-slate-900' : 'text-slate-500'}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
