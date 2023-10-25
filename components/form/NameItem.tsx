import { View } from 'react-native';
import { TextInput } from '../common/native-component';

import FormLabel from './FormLabel';
import FormMessage from './FormMessage';
import MatchedFavoriteFoodNameList from './MatchedFavoriteFoodNameList';
import tw from 'twrnc';

interface Props {
  name: string;
  changeInfo: (newInfo: { [key: string]: string }) => void;
}

const NAME_MAX_LENGTH = 40;

export default function NameItem({ name, changeInfo }: Props) {
  const onChangeText = (value: string) => changeInfo({ name: value });

  return (
    <View>
      <FormLabel label='식료품 이름' />

      <TextInput
        style={tw`rounded-lg bg-white border-slate-300 h-11 border flex-row items-center`}
        onChangeText={onChangeText}
        value={name}
        placeholder='식료품 이름을 작성해주세요'
        focusable={false}
        maxLength={40}
      />

      <FormMessage
        active={name.length >= 40}
        message={`식료품 이름은 ${NAME_MAX_LENGTH}자를 넘을 수 없습니다.`}
        color='orange'
      />

      <MatchedFavoriteFoodNameList name={name} changeInfo={changeInfo} />
    </View>
  );
}
