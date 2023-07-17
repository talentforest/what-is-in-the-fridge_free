import { TextInput } from '../../native-component';
import tw from 'twrnc';

interface Props {
  name: string;

  changeInfo: (newInfo: { [key: string]: string }) => void;
  editable: boolean;
}

export default function NameItem({ name, changeInfo, editable }: Props) {
  const onChangeText = (value: string) => changeInfo({ name: value });

  return (
    <TextInput
      style={tw`flex-1 rounded-lg ${
        !editable ? 'bg-slate-100 text-slate-600' : 'bg-white'
      }`}
      editable={editable}
      onChangeText={onChangeText}
      value={name}
      placeholder={`식료품 이름을 작성해주세요`}
      focusable={true}
      selectTextOnFocus={true}
      showSoftInputOnFocus={true}
      returnKeyType='next'
      returnKeyLabel='다음'
    />
  );
}
