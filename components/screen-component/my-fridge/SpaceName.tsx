import { View } from 'react-native';
import { Text } from '../../native-component';
import { BLUE } from '../../../constant/colors';
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
        size={15}
        color={BLUE}
      />
      <Text style={tw`text-slate-600`} fontSize={15}>
        {space}
      </Text>
    </View>
  );
}
