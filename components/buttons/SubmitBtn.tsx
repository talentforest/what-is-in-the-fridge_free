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
}

export default function SubmitBtn({
  btnName,
  onPress,
  iconName,
  color = 'blue',
  tailIcon,
}: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={tw.style(
        `bg-${color}-600 h-11.5 flex-row items-center justify-center gap-1.5 rounded-lg`,
        shadowStyle(3)
      )}
    >
      {iconName && (
        <Icon name={iconName} type='Feather' color='#fff' size={15} />
      )}

      <Text style={tw`text-white text-center`}>{btnName}</Text>

      {tailIcon && (
        <Icon name={tailIcon} type='Feather' color='#fff' size={18} />
      )}
    </TouchableOpacity>
  );
}
