import { useNavigation } from '@react-navigation/native';
import {
  Text,
  TouchableOpacity,
} from '../../components/common/native-component';
import { NavigateProp } from '../../navigation/Navigation';

import Icon from '../../components/common/native-component/Icon';
import IconChevronRight from '../../components/svg/arrow/IconChevronRight';
import tw from 'twrnc';

export default function PantyEntranceBtn() {
  const navigation = useNavigation<NavigateProp>();

  const onNavigatePress = () => navigation.navigate('PantryFoods');

  return (
    <TouchableOpacity
      onPress={onNavigatePress}
      style={tw`-mb-3 self-end bg-gray-600 flex-row py-2 pl-3 pr-2 items-center justify-center rounded-full`}
    >
      <Icon name='package' type='Octicons' color={'#fff'} size={13} />
      <Text fontSize={15} style={tw`text-white ml-0.5`}>
        팬트리에 들어가기
      </Text>
      <IconChevronRight size={15} color={'#fff'} />
    </TouchableOpacity>
  );
}
