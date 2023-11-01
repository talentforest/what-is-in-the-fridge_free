import { View } from 'react-native';
import {
  Text,
  TouchableOpacity,
} from '../../components/common/native-component';
import { GRAY } from '../../constant/colors';
import { useNavigation } from '@react-navigation/native';
import { NavigateProp } from '../../navigation/Navigation';
import Icon from '../../components/common/native-component/Icon';
import tw from 'twrnc';

export default function HomeHeader() {
  const navigation = useNavigation<NavigateProp>();

  return (
    <View style={tw`flex-row justify-between items-center gap-0.5 my-2`}>
      <Text style={tw`ml-0.5 text-2xl`}>냉장고에 뭐가 있지</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Setting')}
        style={tw`flex-row items-center  rounded-xl px-1 py-0.5 gap-1 pr-1.5`}
      >
        <Icon name='settings' type='Feather' size={20} color={GRAY} />
      </TouchableOpacity>
    </View>
  );
}
