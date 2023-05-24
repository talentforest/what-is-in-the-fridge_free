import { View } from 'react-native';
import { TextInput } from '../../native-component';
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
    <View style={tw`w-full`}>
      <View>
        <TextInput
          placeholder='찾는 식품의 이름의 검색해주세요.'
          styletw='pr-9'
          value={searchKeyword}
          onChangeText={onChangeText}
          returnKeyType='done'
        />
        <Icon
          style={tw`absolute bg-white right-2 top-2`}
          name='search'
          size={26}
          color={INACTIVE_COLOR}
        />
      </View>
    </View>
  );
}
