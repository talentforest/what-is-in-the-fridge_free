import { View } from 'react-native';
import { Text } from '../common/native-component';
import { FormLabelType } from '../../constant/formInfo';
import tw from 'twrnc';

interface Props {
  label: FormLabelType;
}

export default function FormLabel({ label }: Props) {
  return (
    <View style={tw`flex-row items-center gap-1 mb-0.5`}>
      <Text style={tw`text-blue-600 text-sm`}>{label}</Text>
    </View>
  );
}
