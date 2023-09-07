import { View } from 'react-native';
import { Text } from '../common/native-component';
import { INDIGO } from '../../constant/colors';

import Icon from '../common/native-component/Icon';
import tw from 'twrnc';

export default function FavoriteTagBox() {
  return (
    <View
      style={tw`flex-row items-center gap-1 border border-indigo-300 rounded-full bg-indigo-50 p-0.5 px-2.5`}
    >
      <Icon
        type='MaterialCommunityIcons'
        name='tag-heart'
        size={13}
        color={INDIGO}
      />
      <Text style={tw`text-indigo-800 text-[13px]`}>자주 먹는 식료품</Text>
    </View>
  );
}
