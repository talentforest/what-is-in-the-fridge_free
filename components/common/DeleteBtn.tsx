import { TouchableOpacity } from '../native-component';
import Icon from 'react-native-vector-icons/AntDesign';
import tw from 'twrnc';

interface Props {
  onPress: () => void;
}

export default function DeleteBtn({ onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon name='delete' size={20} color='#ff8800' />
    </TouchableOpacity>
  );
}
