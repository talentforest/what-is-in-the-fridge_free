import Icon from 'react-native-vector-icons/AntDesign';
import { TouchableOpacity } from '../native-component';

interface Props {
  onPress: () => void;
  editing: boolean;
}

export default function EditBtn({ onPress, editing }: Props) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon name={editing ? 'checkcircle' : 'edit'} size={22} color='#4e45ff' />
    </TouchableOpacity>
  );
}
