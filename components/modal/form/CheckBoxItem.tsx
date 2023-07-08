import { Text, TouchableOpacity } from '../../native-component';
import { INACTIVE_COLOR, ORANGE_RED } from '../../../constant/colors';
import tw from 'twrnc';
import Icon from '../../native-component/Icon';
import CheckBox from '../../common/Box/CheckBox';

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
      style={tw`flex-row items-center gap-1`}
      onPress={onPress}
    >
      <CheckBox checked={checked} activeColor={ORANGE_RED} />
      <Text
        style={tw`${checked ? 'text-slate-900' : 'text-slate-500'}`}
        fontSize={14}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
