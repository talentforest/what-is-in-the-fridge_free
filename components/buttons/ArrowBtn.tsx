import { View } from 'react-native';
import { BLUE, LIGHT_GRAY } from '../../constant/colors';
import { Text, TouchableOpacity } from '../common/native-component';

import Icon from '../common/native-component/Icon';
import tw from 'twrnc';

interface Props {
  type: 'previous' | 'next';
  moveStep: () => void;
  active: boolean;
}

export default function ArrowBtn({ type, moveStep, active }: Props) {
  return (
    <View>
      <TouchableOpacity
        onPress={moveStep}
        disabled={!active}
        style={tw`flex-row items-center p-2`}
      >
        {type === 'previous' && (
          <Icon
            name='chevron-left'
            type='MaterialCommunityIcons'
            size={18}
            color={active ? BLUE : LIGHT_GRAY}
          />
        )}
        <Text style={tw`${active ? 'text-blue-600' : 'text-slate-400'}`}>
          {type === 'previous' ? '이전' : '다음'}
        </Text>
        {type === 'next' && (
          <Icon
            name='chevron-right'
            type='MaterialCommunityIcons'
            size={22}
            color={active ? BLUE : LIGHT_GRAY}
          />
        )}
      </TouchableOpacity>
    </View>
  );
}
