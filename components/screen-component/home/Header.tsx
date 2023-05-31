import { View } from 'react-native';
import { Text, TouchableOpacity } from '../../native-component';
import { useNavigation } from '@react-navigation/native';
import { NavigateProp } from '../../../navigation/Navigation';
import { INDIGO } from '../../../constant/colors';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Header() {
  const navigation = useNavigation<NavigateProp>();

  return (
    <View style={tw`flex-row items-center justify-between mb-3`}>
      <Text styletw='flex-1 text-xl'>냉장고에 뭐가 있지?</Text>
      <TouchableOpacity
        style={tw`ml-4`}
        onPress={() => navigation.navigate('Notification')}
      >
        <Icon name='md-notifications' size={20} color={INDIGO} />
      </TouchableOpacity>
    </View>
  );
}
