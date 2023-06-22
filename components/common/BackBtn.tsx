import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from '../native-component';
import { DEEP_INDIGO } from '../../constant/colors';
import Icon from '../native-component/Icon';

export default function BackBtn() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Icon type='AntDesign' name='left' size={22} color={DEEP_INDIGO} />
    </TouchableOpacity>
  );
}
