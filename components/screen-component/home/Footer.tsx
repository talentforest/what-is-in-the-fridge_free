import { Dimensions, View } from 'react-native';
import { Text } from '../../native-component';
import tw from 'twrnc';

export default function Footer() {
  const { height: SCREEN_HEIGHT } = Dimensions.get('window');

  return (
    <View style={tw`mt-10 h-[${SCREEN_HEIGHT / 20}] -mx-4 p-4 bg-indigo-200`}>
      <Text fontSize={12} style={tw`text-indigo-700 p-0.5`}>
        Jellie All Rights Reserved
      </Text>
    </View>
  );
}
