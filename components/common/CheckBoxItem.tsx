import { Text, TouchableOpacity } from './native-component';
import { View } from 'react-native';
import { MEDIUM_GRAY } from '../../constant/colors';
import CheckBox from './CheckBox';
import tw from 'twrnc';

interface Props {
  onPress: () => void;
  checked: boolean;
  title: string;
  disabled?: boolean;
  inActiveColor?: string;
}

export default function CheckBoxItem({
  disabled,
  onPress,
  checked,
  title,
  inActiveColor = MEDIUM_GRAY,
}: Props) {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={tw`flex-row items-center gap-1 py-2 pr-1`}
      onPress={onPress}
    >
      <View>
        <CheckBox checked={checked} inActiveColor={inActiveColor} />
      </View>

      <Text
        style={tw`${checked ? 'text-blue-700' : `text-[${inActiveColor}]`}`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
