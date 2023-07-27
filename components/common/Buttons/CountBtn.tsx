import { DEEP_BLUE, LIGHT_GRAY, ORANGE_RED } from '../../../constant/colors';
import { scaleH } from '../../../util';
import { TouchableOpacity } from '../../native-component';
import Icon from '../../native-component/Icon';
import tw from 'twrnc';

interface Props {
  type: 'minus' | 'plus';
  onPress: () => void;
  active: boolean;
}

export default function CountBtn({ type, onPress, active }: Props) {
  const COLOR = type === 'minus' ? ORANGE_RED : DEEP_BLUE;
  const COLOR_STRING = type === 'minus' ? 'orange' : 'blue';
  const SIZE = `h-${scaleH(6.5)} w-${scaleH(6.5)}`;
  const ACTIVE_STYLE = active ? `border border-${COLOR_STRING}-400` : '';

  return (
    <TouchableOpacity
      style={tw`items-center justify-center rounded-lg ${SIZE} ${ACTIVE_STYLE}`}
      onPress={onPress}
    >
      <Icon
        type='MaterialCommunityIcons'
        name={type === 'minus' ? 'minus' : 'plus'}
        color={active ? COLOR : LIGHT_GRAY}
        size={18}
      />
    </TouchableOpacity>
  );
}
