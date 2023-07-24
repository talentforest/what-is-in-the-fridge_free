import { View } from 'react-native';
import { DEEP_YELLOW, LIGHT_GRAY } from '../../../constant/colors';
import { FormStep } from '../../../constant/formInfo';
import { Text, TouchableOpacity } from '../../native-component';
import Icon from '../../native-component/Icon';
import tw from 'twrnc';

interface Props {
  type: 'previous' | 'next';

  moveStep: () => void;
  active: boolean;
}

export default function ArrowBtn({
  type,

  moveStep,
  active,
}: Props) {
  return (
    <View>
      <TouchableOpacity
        onPress={moveStep}
        style={tw`flex-row items-center p-2`}
      >
        {type === 'previous' && (
          <Icon
            name='chevron-left'
            type='MaterialCommunityIcons'
            size={20}
            color={active ? DEEP_YELLOW : LIGHT_GRAY}
          />
        )}
        <Text style={tw`${active ? 'text-indigo-600' : 'text-slate-400'}`}>
          {type === 'previous' ? '이전' : '다음'}
        </Text>
        {type === 'next' && (
          <Icon
            name='chevron-right'
            type='MaterialCommunityIcons'
            size={20}
            color={active ? DEEP_YELLOW : LIGHT_GRAY}
          />
        )}
      </TouchableOpacity>
    </View>
  );
}
