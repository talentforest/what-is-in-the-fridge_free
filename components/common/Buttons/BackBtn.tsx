import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from '../../native-component';
import { GRAY } from '../../../constant/colors';
import Icon from '../../native-component/Icon';

export default function BackBtn() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Icon type='Feather' name='chevron-left' size={20} color={GRAY} />
    </TouchableOpacity>
  );
}
