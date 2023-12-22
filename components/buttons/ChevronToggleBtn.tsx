import { LIGHT_GRAY, MEDIUM_GRAY } from '../../constant/colors';
import { Text, TouchableOpacity } from '../common/native-component';
import IconChevronDown from '../svg/arrow/IconChevronDown';
import IconChevronUp from '../svg/arrow/IconChevronUp';
import tw from 'twrnc';

export default function ChevronToggleBtn({ onPress, isOpen }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={tw`gap-0.5 h-full flex-row items-center`}
    >
      {isOpen ? (
        <IconChevronUp size={13} color={LIGHT_GRAY} />
      ) : (
        <IconChevronDown size={13} color={MEDIUM_GRAY} />
      )}

      <Text fontSize={14} style={tw`text-gray-${isOpen ? '400' : '500'}`}>
        {isOpen ? '생략하기' : '추가하기'}
      </Text>
    </TouchableOpacity>
  );
}
