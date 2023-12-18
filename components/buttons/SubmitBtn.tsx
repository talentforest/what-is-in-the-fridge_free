import { shadowStyle } from '../../constant/shadowStyle';
import { Text, TouchableOpacity } from '../common/native-component';
import Icon from '../common/native-component/Icon';
import tw from 'twrnc';
import IconChevronRight from '../svg/arrow/IconChevronRight';

interface Props {
  btnName: string;
  onPress: () => void;
  color?: 'blue' | 'gray';
  iconName?: string;
  tailIcon?: boolean;
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
        `bg-${color}-600 h-11 flex-row items-center justify-center gap-1.5 rounded-xl`,
        shadowStyle(3)
      )}
    >
      {iconName && (
        <Icon
          name={iconName}
          type={
            iconName === 'plus' || iconName === 'pencil'
              ? 'Octicons'
              : 'MaterialCommunityIcons'
          }
          color='#fff'
          size={iconName === 'plus' || iconName === 'pencil' ? 14 : 16}
        />
      )}

      <Text style={tw`text-white text-center`}>{btnName}</Text>

      {tailIcon && <IconChevronRight color='#fff' />}
    </TouchableOpacity>
  );
}
