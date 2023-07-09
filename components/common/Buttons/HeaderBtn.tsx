import { DEEP_BLUE } from '../../../constant/colors';
import { TouchableOpacity } from '../../native-component';
import Icon from '../../native-component/Icon';
import tw from 'twrnc';

interface Props {
  iconName: string;
  onPress: () => void;
}

export default function HeaderBtn({ iconName, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={tw`pr-4`}>
      <Icon
        name={iconName}
        type={iconName === 'search' ? 'Ionicons' : 'MaterialCommunityIcons'}
        size={24}
        color={DEEP_BLUE}
      />
    </TouchableOpacity>
  );
}
