import { BLUE, ORANGE_RED } from '../../../constant/colors';
import { scaleH } from '../../../util';
import { TouchableOpacity } from '../../native-component';
import Icon from '../../native-component/Icon';
import tw from 'twrnc';

interface Props {
  type: 'minus' | 'plus';
  onPress: () => void;
}

export default function CountBtn({ type, onPress }: Props) {
  return (
    <TouchableOpacity
      style={tw`px-1 items-center justify-center border-2 rounded-full h-${scaleH(
        7.5
      )} w-${scaleH(7.5)} ${
        type === 'minus' ? ' border-orange-200' : 'border-blue-200'
      }`}
      onPress={onPress}
    >
      <Icon
        type='MaterialCommunityIcons'
        name={type === 'minus' ? 'minus' : 'plus'}
        color={type === 'minus' ? ORANGE_RED : BLUE}
        size={18}
      />
    </TouchableOpacity>
  );
}
