import { View } from 'react-native';
import { Text } from '../../native-component';
import { DdangMedium } from '../../../constant/fonts';
import tw from 'twrnc';

export default function LogoTitle() {
  return (
    <View style={tw`flex-row items-center justify-between mt-2 mb-3`}>
      <Text
        style={tw.style('text-stone-600', { ...DdangMedium })}
        fontSize={24}
      >
        냉장고에 뭐가 있지?
      </Text>
    </View>
  );
}