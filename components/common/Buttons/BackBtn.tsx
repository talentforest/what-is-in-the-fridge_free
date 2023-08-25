import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from '../../native-component';
import { GRAY } from '../../../constant/colors';
import Icon from '../../native-component/Icon';
import tw from 'twrnc';

export default function BackBtn() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.goBack()} style={tw`p-1`}>
      <Icon type='Feather' name='chevron-left' size={22} color={GRAY} />
    </TouchableOpacity>
  );
}
