import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from '../native-component';
import Icon from 'react-native-vector-icons/AntDesign';
import { DEEP_INDIGO } from '../../constant/colors';

export default function BackBtn() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Icon name='left' size={18} color={DEEP_INDIGO} />
    </TouchableOpacity>
  );
}
