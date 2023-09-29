import { BLUE } from '../../constant/colors';
import { shadowStyle } from '../../constant/shadowStyle';
import { TouchableOpacity } from '../common/native-component';
import Icon from '../common/native-component/Icon';
import tw from 'twrnc';

interface Props {
  onPress: () => void;
  disabled: boolean;
  icon: string;
}

export default function SquareIconBtn({ onPress, disabled, icon }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={tw.style(
        `border border-slate-200 bg-white h-11 w-11 ml-2 mb-0.5 items-center justify-center rounded-xl`,
        shadowStyle(3)
      )}
    >
      <Icon
        type='MaterialCommunityIcons'
        name={icon}
        size={21}
        color={icon.includes('plus') ? BLUE : 'amber'}
      />
    </TouchableOpacity>
  );
}
