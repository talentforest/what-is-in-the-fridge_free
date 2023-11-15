import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from '../common/native-component';
import IconChevronLeft from '../svg/arrow/IconChevronLeft';
import tw from 'twrnc';

export default function HeaderBackBtn() {
  const navigation = useNavigation();

  const onBtnPress = () => {
    return navigation.goBack();
  };

  return (
    <TouchableOpacity onPress={onBtnPress} style={tw`p-2`}>
      <IconChevronLeft size={20} />
    </TouchableOpacity>
  );
}
