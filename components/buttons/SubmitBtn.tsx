import { shadowStyle } from '../../constant/shadowStyle';
import { Text, TouchableOpacity } from '../common/native-component';
import Icon from '../common/native-component/Icon';
import tw from 'twrnc';

interface Props {
  btnName: string;
  onPress: () => void;
  color?: 'blue' | 'gray';
  iconName?: string;
  tailIcon?: string;
  textSize?: number;
}

export default function SubmitBtn({
  btnName,
  onPress,
  iconName,
  color = 'blue',
  textSize = 15,
  tailIcon,
}: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={tw.style(
        `bg-${color}-600 h-13 flex-row items-center justify-center gap-1.5 rounded-lg`,
        shadowStyle(3)
      )}
    >
      {iconName && (
        <Icon name={iconName} type='Feather' color='#fff' size={16} />
      )}
      <Text style={tw`text-white text-center pt-0.8 text-[${textSize}px]`}>
        {btnName}
      </Text>
      {tailIcon && (
        <Icon name={tailIcon} type='Ionicons' color='#fff' size={16} />
      )}
    </TouchableOpacity>
  );
}
