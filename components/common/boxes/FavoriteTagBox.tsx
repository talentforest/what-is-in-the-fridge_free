import { View } from 'react-native';
import { Text } from '../../native-component';
import Icon from '../../native-component/Icon';
import tw from 'twrnc';

export default function FavoriteTagBox() {
  return (
    <View
      style={tw`flex-row items-center gap-1 border border-slate-300 rounded-lg bg-indigo-50 p-1 px-2`}
    >
      <Icon type='MaterialCommunityIcons' name='tag-heart' size={14} />
      <Text style={tw`text-indigo-500`} fontSize={12}>
        자주 먹는 식품
      </Text>
    </View>
  );
}
