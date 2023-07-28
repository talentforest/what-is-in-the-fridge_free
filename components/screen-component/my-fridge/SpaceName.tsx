import { View } from 'react-native';
import { Text } from '../../native-component';
import { BLUE, DEEP_YELLOW } from '../../../constant/colors';
import { Space } from '../../../constant/fridgeInfo';
import Icon from '../../native-component/Icon';
import tw from 'twrnc';

export default function SpaceName({ space }: { space: Space }) {
  return (
    <View
      style={tw`border-b border-slate-400 mb-3 pt-1 pb-2 flex-row items-center gap-1`}
    >
      <Icon
        name='information'
        type='MaterialCommunityIcons'
        size={16}
        color={space.includes('냉동') ? BLUE : DEEP_YELLOW}
      />
      <Text style={tw`text-slate-600`}>{space}</Text>
    </View>
  );
}
