import { View } from 'react-native';
import { Text } from '../common/native-component';
import Icon from '../common/native-component/Icon';
import tw from 'twrnc';

export default function TableHeader() {
  return (
    <View style={tw`flex-row px-2.5 py-2 gap-2`}>
      <View style={tw`flex-row items-center gap-2 flex-1`}>
        <Icon name='list-unordered' type='Octicons' size={13} />
        <Text fontSize={15} style={tw`flex-1`}>
          식료품 이름
        </Text>
      </View>

      <View style={tw`w-14 items-end`}>
        <Text fontSize={15}>소비기한순</Text>
      </View>
    </View>
  );
}
