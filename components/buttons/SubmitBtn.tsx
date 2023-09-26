import { shadowStyle } from '../../constant/shadowStyle';
import { Text, TouchableOpacity } from '../common/native-component';
import Icon from '../common/native-component/Icon';
import tw from 'twrnc';

interface Props {
  btnName: string;
  onPress: () => void;
  iconName?: string;
  color: 'blue' | 'amber';
}

export default function SubmitBtn({
  btnName,
  onPress,
  iconName,
  color,
}: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={tw.style(
        `bg-${color}-50 border-${color}-300 py-2.5 flex-row items-center justify-center border gap-1.5 rounded-lg`,
        shadowStyle(5)
      )}
    >
      {iconName && (
        <Icon
          name={iconName}
          type='MaterialCommunityIcons'
          color={color}
          size={17}
        />
      )}
      <Text style={tw`text-${color}-700 text-center text-base`}>{btnName}</Text>
    </TouchableOpacity>
  );
}
