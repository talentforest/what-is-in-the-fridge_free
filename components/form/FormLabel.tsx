import { View } from 'react-native';
import { Text, TouchableOpacity } from '../common/native-component';
import { FormLabelType } from '../../constant/formInfo';
import { GRAY, LIGHT_GRAY } from '../../constant/colors';
import Icon from '../common/native-component/Icon';
import tw from 'twrnc';

interface Props {
  label: FormLabelType;
  option?: boolean;
  isOpen?: boolean;
  onPress?: () => void;
}

export default function FormLabel({ label, option, isOpen, onPress }: Props) {
  return (
    <View style={tw`flex-row items-center gap-1 justify-between mb-1`}>
      <View style={tw`flex-row items-center gap-1 mb-0.5`}>
        <Text style={tw`text-blue-600 text-sm`}>{label}</Text>
      </View>

      {option && onPress && (
        <TouchableOpacity
          onPress={onPress}
          style={tw`gap-0.5 rounded-full flex-row items-center`}
        >
          <Icon
            name={isOpen ? 'chevron-up' : 'add'}
            type='Ionicons'
            size={16}
            color={isOpen ? LIGHT_GRAY : GRAY}
          />
          <Text
            style={tw`text-[14px] py-0 ${
              isOpen ? 'text-slate-500' : 'text-slate-700'
            }`}
          >
            {isOpen ? '생략하기' : '추가하기'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
