import { TouchableOpacity } from '../common/native-component';
import { BLUE } from '../../constant/colors';
import Icon from '../common/native-component/Icon';
import tw from 'twrnc';

interface Props {
  onPress: () => void;
  disabled?: boolean;
}

export default function AddIconBtn({ onPress, disabled }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={tw`h-full justify-center w-[12%] border border-white rounded-xl items-end pr-3`}
      disabled={disabled}
    >
      <Icon
        type='Octicons'
        name='plus'
        size={18}
        color={disabled ? '#e0e0e0' : BLUE}
      />
    </TouchableOpacity>
  );
}
