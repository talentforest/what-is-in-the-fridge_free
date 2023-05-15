import { View } from 'react-native';
import { Text, TextInput } from '../native-component';
import tw from 'twrnc';

interface Props {
  changeFoodInfo: (newInfo: { [key: string]: string }) => void;
  value: string;
  placeholder: string;
}

export default function FormNameItem({
  value,
  changeFoodInfo,
  placeholder,
}: Props) {
  const onChangeText = (value: string) => {
    changeFoodInfo({ name: value });
  };

  return (
    <View
      style={tw`flex-1 justify-between bg-indigo-50 rounded-lg border-slate-400 border p-2`}
    >
      <Text styletw='mb-2 text-indigo-500 text-xs'>식료품 이름 작성</Text>
      <TextInput
        styletw='self-end w-full'
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        focusable={true}
        selectTextOnFocus={true}
        showSoftInputOnFocus={true}
        returnKeyType='next'
        returnKeyLabel='다음'
      />
    </View>
  );
}
