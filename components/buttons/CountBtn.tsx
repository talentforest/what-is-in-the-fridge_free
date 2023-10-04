import { LIGHT_GRAY } from '../../constant/colors';
import { TouchableOpacity } from '../common/native-component';
import Icon from '../common/native-component/Icon';
import tw from 'twrnc';

interface Props {
  type: 'minus' | 'plus';
  onPress: () => void;
  active: boolean;
}

export default function CountBtn({ type, onPress, active }: Props) {
  const COLOR_STRING = type === 'minus' ? 'slate' : 'blue';
  const SIZE = `h-6.5 w-6.5`;
  const ACTIVE_STYLE = active
    ? `border border-${COLOR_STRING}-200 bg-${COLOR_STRING}-600`
    : 'border border-slate-300 bg-slate-100';

  return (
    <TouchableOpacity
      style={tw`items-center shadow-sm justify-center rounded-md ${SIZE} ${ACTIVE_STYLE}`}
      onPress={onPress}
    >
      <Icon
        type='MaterialCommunityIcons'
        name={type === 'minus' ? 'minus' : 'plus'}
        color={active ? '#fff' : LIGHT_GRAY}
        size={17}
      />
    </TouchableOpacity>
  );
}
