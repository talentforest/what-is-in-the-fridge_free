import { View } from 'react-native';
import { Text } from '../common/native-component';
import { FormLabelType } from '../../constant/formInfo';
import { ReactNode } from 'react';
import tw from 'twrnc';

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
