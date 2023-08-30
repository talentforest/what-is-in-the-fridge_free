import { LIGHT_GRAY } from '../../../constant/colors';
import { TouchableOpacity } from '../../native-component';
import Icon from '../../native-component/Icon';
import tw from 'twrnc';

interface Props {
  type: 'minus' | 'plus';
  onPress: () => void;
  active: boolean;
}

export default function CountBtn({ type, onPress, active }: Props) {
  const COLOR_STRING = type === 'minus' ? 'orange' : 'blue';
  const SIZE = `h-6 w-6`;
  const ACTIVE_STYLE = active
    ? `border border-${COLOR_STRING}-400 bg-${COLOR_STRING}-500`
    : 'border border-slate-300 bg-slate-100';

  return (
    <TouchableOpacity
      style={tw`items-center justify-center rounded-full ${SIZE} ${ACTIVE_STYLE}`}
      onPress={onPress}
    >
      <Icon
        type='MaterialCommunityIcons'
        name={type === 'minus' ? 'minus' : 'plus'}
        color={active ? '#fff' : LIGHT_GRAY}
        size={18}
      />
    </TouchableOpacity>
  );
}
