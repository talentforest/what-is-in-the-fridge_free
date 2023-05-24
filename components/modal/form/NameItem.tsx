import { TextInput } from '../../native-component';

interface Props {
  name: string;
  changeInfo: (newInfo: { [key: string]: string }) => void;
}

export default function NameItem({ name, changeInfo }: Props) {
  const onChangeText = (value: string) => changeInfo({ name: value });

  return (
    <TextInput
      styletw='flex-1'
      onChangeText={onChangeText}
      value={name}
      placeholder='식료품 이름을 수정해주세요'
      focusable={true}
      selectTextOnFocus={true}
      showSoftInputOnFocus={true}
      returnKeyType='next'
      returnKeyLabel='다음'
    />
  );
}
