import { View } from 'react-native';
import { GRAY, LIGHT_GRAY } from '../../constant/colors';
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
          <IconChevronLeft size={14} color={active ? GRAY : LIGHT_GRAY} />
        )}

        <Text
          fontSize={15}
          style={tw`${active ? 'text-gray-600' : 'text-gray-400'}`}
        >
          {type === 'previous' ? '이전' : '다음'}
        </Text>

        {type === 'next' && (
          <IconChevronRight size={14} color={active ? GRAY : LIGHT_GRAY} />
        )}
      </TouchableOpacity>
    </View>
  );
}
