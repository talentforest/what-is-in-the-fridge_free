import { View } from 'react-native';
import { TextInput, TouchableOpacity } from '../../native-component';
import { scaleH } from '../../../util';
import { GRAY, LIGHT_GRAY } from '../../../constant/colors';
import Icon from '../../native-component/Icon';
import tw from 'twrnc';

interface Props {
  keyword: string;
  setKeyword: (keyword: string) => void;
}

export default function SearchInput({ keyword, setKeyword }: Props) {
  return (
    <View
      style={tw`w-full border h-[${scaleH(
        11
      )}] border-slate-400 rounded-full items-center pl-1.5 pr-3 flex-row bg-white`}
    >
      <TextInput
        value={keyword}
        onChangeText={setKeyword}
        placeholder='냉장고 속 식료품을 찾아보세요.'
        style={tw`text-slate-600 flex-1 rounded-full border-0`}
      />
      <Icon type='Ionicons' name='search' size={22} color={LIGHT_GRAY} />
    </View>
  );
}
