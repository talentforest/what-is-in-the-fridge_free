import { View } from 'react-native';
import { Text, TouchableOpacity } from '../common/native-component';
import { FormLabelType } from '../../constant/formInfo';
import { MEDIUM_GRAY } from '../../constant/colors';
import IconChevronUp from '../svg/arrow/IconChevronUp';
import IconChevronDown from '../svg/arrow/IconChevronDown';
import tw from 'twrnc';
import CheckBox from '../common/CheckBox';
import { ReactNode } from 'react';

interface Props {
  label: FormLabelType;
  children?: ReactNode;
}

export default function FormLabel({ label, children }: Props) {
  return (
    <View style={tw`flex-row items-center justify-between h-6.5`}>
      <Text fontSize={14} style={tw`text-blue-500`}>
        {label}
      </Text>

      {children}
    </View>
  );
}
