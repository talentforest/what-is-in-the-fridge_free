import { INDIGO } from '../../constant/colors';
import { TouchableOpacity } from '../native-component';
import Icon from 'react-native-vector-icons/AntDesign';

type IconName = 'pluscircle' | 'delete' | 'checkcircle' | 'edit';

interface Props {
  onPress: () => void;
  iconName: IconName;
}

export default function IconBtn({ onPress, iconName }: Props) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon name={iconName} size={20} color={INDIGO} />
    </TouchableOpacity>
  );
}
