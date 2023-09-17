import { BLUE } from '../../constant/colors';
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
      style={tw`border border-slate-300 bg-white shadow-md ml-2 h-8.5 w-8.5 items-center justify-center rounded-lg`}
    >
      <Icon
        type='MaterialCommunityIcons'
        name={icon}
        size={20}
        color={icon.includes('plus') ? BLUE : 'amber'}
      />
    </TouchableOpacity>
  );
}