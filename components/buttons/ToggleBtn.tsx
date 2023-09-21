import { Text, TouchableOpacity } from '../common/native-component';
import tw from 'twrnc';
import Icon from '../common/native-component/Icon';

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
      style={tw`flex-row items-center justify-center gap-1 h-full px-2 w-26`}
      onPress={onPress}
      disabled={disabled}
    >
      <Icon
        type='MaterialCommunityIcons'
        name='tag-heart'
        size={16}
        color={check ? '#fff' : '#ccc'}
      />
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
