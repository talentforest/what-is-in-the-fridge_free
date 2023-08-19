import { Text, TouchableOpacity } from '../../native-component';
import tw from 'twrnc';

interface ToggleBtnProps {
  check: boolean;
  onPress: () => void;
  btnName: string;
  disabled?: boolean;
}

export default function ToggleBtn({
  check,
  onPress,
  btnName,
  disabled,
}: ToggleBtnProps) {
  return (
    <TouchableOpacity
      style={tw`z-10 flex-row items-center justify-center gap-2 h-full px-3 w-22`}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        style={tw`${check ? 'text-white' : 'text-slate-400'} ${
          disabled && btnName === '아니에요' ? 'text-slate-300' : ''
        }`}
      >
        {btnName}
      </Text>
    </TouchableOpacity>
  );
}
