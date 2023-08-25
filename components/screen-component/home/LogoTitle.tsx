import { View } from 'react-native';
import { Text } from '../../native-component';
import { Cafe24Ssurround } from '../../../constant/fonts';
import tw from 'twrnc';

export default function LogoTitle() {
  return (
    <View style={tw`flex-row items-center justify-between mt-1 mb-3`}>
      <Text fontSize={20} style={tw.style(`text-indigo-500`, Cafe24Ssurround)}>
        냉장고에 뭐가 있지?
      </Text>
    </View>
  );
}
