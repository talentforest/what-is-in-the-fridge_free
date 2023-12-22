import { Text, TouchableOpacity } from './native-component';
import { View } from 'react-native';
import { BLUE, MEDIUM_GRAY } from '../../constant/colors';
import CheckBox from './CheckBox';
import tw from 'twrnc';

interface Props {
  onPress: () => void;
  checked: boolean;
  title: string;
  disabled?: boolean;
  size?: number;
  activeColor?: string;
  inActiveColor?: string;
}

export default function CheckBoxItem({
  disabled,
  onPress,
  checked,
  title,
  size = 15,
  activeColor = BLUE,
  inActiveColor = MEDIUM_GRAY,
}: Props) {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={tw`flex-row items-center gap-1 h-full pr-1`}
      onPress={onPress}
    >
      <View>
        <CheckBox
          checked={checked}
          inActiveColor={inActiveColor}
          size={size - 3}
        />
      </View>

      <Text
        fontSize={size}
        style={tw`${
          checked ? `text-[${activeColor}]` : `text-[${inActiveColor}]`
        }`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
