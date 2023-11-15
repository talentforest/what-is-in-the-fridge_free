import { View } from 'react-native';
import { Text, TouchableOpacity } from '../common/native-component';
import { FormLabelType } from '../../constant/formInfo';
import { LIGHT_GRAY } from '../../constant/colors';
import IconChevronUp from '../svg/arrow/IconChevronUp';
import IconChevronDown from '../svg/arrow/IconChevronDown';
import tw from 'twrnc';

interface Props {
  label: FormLabelType;
  option?: boolean;
  isOpen?: boolean;
  onPress?: () => void;
}

export default function FormLabel({ label, option, isOpen, onPress }: Props) {
  return (
    <View style={tw`flex-row items-center justify-between pb-0.5`}>
      <View style={tw`flex-row items-center`}>
        <Text fontSize={label === '수량' ? 16 : 15} style={tw`text-blue-600`}>
          {label}
        </Text>
      </View>

      {option && onPress && (
        <TouchableOpacity
          onPress={onPress}
          style={tw`gap-0.5 pl-4 py-1 flex-row items-center justify-end`}
        >
          {isOpen ? (
            <IconChevronUp size={14} color={LIGHT_GRAY} />
          ) : (
            <IconChevronDown size={14} color={LIGHT_GRAY} />
          )}

          <Text fontSize={15} style={tw`text-slate-700`}>
            {isOpen ? '생략하기' : '추가하기'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
