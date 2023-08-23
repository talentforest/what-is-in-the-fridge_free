import { DEEP_GRAY } from '../../../constant/colors';
import { scaleH } from '../../../util';
import { TouchableOpacity } from '../../native-component';
import Icon from '../../native-component/Icon';
import tw from 'twrnc';

interface Props {
  iconName: string;
  onPress: () => void;
  type?: 'MaterialCommunityIcons' | 'AntDesign' | 'Ionicons' | 'Feather';
}

export default function HeaderBtn({
  iconName,
  onPress,
  type = 'Ionicons',
}: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={tw`px-[${scaleH(10)}px] py-[${scaleH(4)}px]`}
    >
      <Icon name={iconName} type={type} size={18} color={DEEP_GRAY} />
    </TouchableOpacity>
  );
}
