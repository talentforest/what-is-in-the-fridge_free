import { useNavigation } from '@react-navigation/native';
import {
  Text,
  TouchableOpacity,
} from '../../components/common/native-component';
import { NavigateProp } from '../../navigation/Navigation';
import Icon from '../../components/common/native-component/Icon';
import tw from 'twrnc';

export default function PantyEntranceBtn() {
  const navigation = useNavigation<NavigateProp>();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('PantryFoods')}
      style={tw`-mb-2 gap-1 flex-row self-end border border-slate-300 bg-stone-500 h-8.5 px-3 mr-4 items-center justify-center rounded-full`}
    >
      <Icon name='box' type='Feather' color='#fff' size={14} />
      <Text style={tw`text-white text-base`}>팬트리에 들어가기</Text>
    </TouchableOpacity>
  );
}
