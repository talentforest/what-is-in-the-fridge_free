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
    <View style={tw`flex-row items-center justify-between`}>
      <View style={tw`flex-row items-center`}>
        <Text style={tw`text-blue-600 text-base`}>{label}</Text>
      </View>

      {option && onPress && (
        <TouchableOpacity
          onPress={onPress}
          style={tw`gap-0.5 pl-4 flex-row items-center justify-end`}
        >
          <Icon
            name={isOpen ? 'chevron-up' : 'plus'}
            type='Feather'
            size={15}
            color={isOpen ? LIGHT_GRAY : GRAY}
          />
          <Text style={tw`text-sm text-slate-500`}>
            {isOpen ? '생략하기' : '추가하기'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
