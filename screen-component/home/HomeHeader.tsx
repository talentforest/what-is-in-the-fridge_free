import { View, useWindowDimensions } from 'react-native';
import {
  Text,
  TouchableOpacity,
} from '../../components/common/native-component';
import { useNavigation } from '@react-navigation/native';
import { NavigateProp } from '../../navigation/Navigation';
import IconGear from '../../components/svg/IconGear';
import tw from 'twrnc';

export default function HomeHeader() {
  const navigation = useNavigation<NavigateProp>();

  const { height } = useWindowDimensions();

  const iconSize = height > 900 ? 30 : 22;
  const fontSize = height > 900 ? 23 : 20;

  return (
    <View style={tw`flex-row h-9 justify-between items-center gap-0.5 my-2`}>
      <Text fontSize={fontSize} style={tw`ml-0.5`}>
        냉장고에 뭐가 있지
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Setting')}
        style={tw`flex-row items-center rounded-xl px-1 py-0.5 gap-1 pr-1.5`}
      >
        <IconGear size={iconSize} />
      </TouchableOpacity>
    </View>
  );
}
