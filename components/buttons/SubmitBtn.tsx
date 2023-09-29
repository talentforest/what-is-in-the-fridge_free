import { SCDream5 } from '../../constant/fonts';
import { shadowStyle } from '../../constant/shadowStyle';
import { Text, TouchableOpacity } from '../common/native-component';
import Icon from '../common/native-component/Icon';
import tw from 'twrnc';

interface Props {
  btnName: string;
  onPress: () => void;
  iconName?: string;
  color: 'blue' | 'gray';
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
        `bg-${color}-600 py-3 flex-row items-center justify-center gap-1.5 rounded-lg`,
        shadowStyle(3)
      )}
    >
      {iconName && (
        <Icon
          name={iconName}
          type='MaterialCommunityIcons'
          color='#fff'
          size={17}
        />
      )}
      <Text style={tw`text-white text-[15px] text-center pt-0.8`}>
        {btnName}
      </Text>
    </TouchableOpacity>
  );
}
