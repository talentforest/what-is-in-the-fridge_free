import { View } from 'react-native';
import { Text, TextInput } from '../../native-component';
import { INACTIVE_COLOR } from '../../../constant/colors';
import { search } from '../../../redux/slice/searchKeywordSlice';
import { useDispatch, useSelector } from '../../../redux/hook';
import Icon from 'react-native-vector-icons/Ionicons';
import tw from 'twrnc';

export default function SearchInput() {
  const { searchKeyword } = useSelector((state) => state.searchKeyword);
  const dispatch = useDispatch();

  const onChangeText = (value: string) => dispatch(search(value));

  return (
    <View style={tw`w-full mb-2`}>
      <View>
        <TextInput
          placeholder='찾는 식품의 이름의 검색해주세요.'
          styletw='pr-9'
          value={searchKeyword}
          onChangeText={onChangeText}
          returnKeyType='done'
        />
        <Icon
          style={tw`absolute bg-white right-2 top-2.5`}
          name='search'
          size={22}
          color={INACTIVE_COLOR}
        />
      </View>
      <Text styletw='text-slate-500 text-sm mt-2'>
        식품안전관리인증기준(HACCP)의 인증을 받은 식품들만 검색됩니다.
      </Text>
    </View>
  );
}
