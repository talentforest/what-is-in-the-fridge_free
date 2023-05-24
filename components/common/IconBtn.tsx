import { INDIGO } from '../../constant/colors';
import { TouchableOpacity } from '../native-component';
import Icon from 'react-native-vector-icons/AntDesign';

type IconName = 'pluscircle' | 'delete' | 'checkcircle' | 'edit';

interface Props {
  onPress: () => void;
  iconName: IconName;
  size?: number;
  color?: string;
}

export default function IconBtn({
  onPress,
  iconName,
  size = 18,
  color = INDIGO,
}: Props) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon name={iconName} size={size} color={color} />
    </TouchableOpacity>
  );
}
