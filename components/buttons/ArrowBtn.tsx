import { View } from 'react-native';
import { BLUE, LIGHT_GRAY } from '../../constant/colors';
import { Text, TouchableOpacity } from '../common/native-component';

import IconChevronLeft from '../svg/arrow/IconChevronLeft';
import IconChevronRight from '../svg/arrow/IconChevronRight';
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
        style={tw`flex-row items-center gap-1 p-2`}
      >
        {type === 'previous' && (
          <IconChevronLeft size={14} color={active ? BLUE : LIGHT_GRAY} />
        )}

        <Text style={tw`${active ? 'text-blue-600' : 'text-slate-400'}`}>
          {type === 'previous' ? '이전' : '다음'}
        </Text>

        {type === 'next' && (
          <IconChevronRight size={14} color={active ? BLUE : LIGHT_GRAY} />
        )}
      </TouchableOpacity>
    </View>
  );
}
