import { Text, TouchableOpacity } from '../common/native-component';
import {
  INDIGO,
  LIGHT_INDIGO,
  MEDIUM_GRAY,
  MEDIUM_INDIGO,
} from '../../constant/colors';
import Icon from '../common/native-component/Icon';
import tw from 'twrnc';

interface ToggleBtnProps {
  check: boolean;
  onPress: () => void;
  btnName: string;
  disabled?: boolean;
  width: number;
}

export default function ToggleBtn({
  check,
  onPress,
  btnName,
  disabled,
  width,
}: ToggleBtnProps) {
  return (
    <TouchableOpacity
      style={tw`flex-row items-center justify-center gap-1 h-full w-[${width}px]`}
      onPress={onPress}
      disabled={disabled}
    >
      <Icon
        type='MaterialCommunityIcons'
        name={btnName === '맞아요' ? 'tag' : 'tag-outline'}
        size={14}
        color={check ? (disabled ? MEDIUM_INDIGO : INDIGO) : MEDIUM_INDIGO}
      />
      <Text
        style={tw`${
          check
            ? disabled
              ? 'text-indigo-300'
              : 'text-indigo-600'
            : 'text-indigo-300'
        }`}
      >
        {btnName}
      </Text>
    </TouchableOpacity>
  );
}
