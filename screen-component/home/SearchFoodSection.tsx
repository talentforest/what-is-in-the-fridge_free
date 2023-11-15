import { useCallback, useEffect } from 'react';
import { debounce, findMatchNameFoods } from '../../util';
import { useSelector } from '../../redux/hook';
import { View } from 'react-native';
import {
  TextInput,
  TouchableOpacity,
} from '../../components/common/native-component';
import { Food } from '../../constant/foodInfo';
import { useFocusEffect } from '@react-navigation/native';
import { shadowStyle } from '../../constant/shadowStyle';
import { MEDIUM_GRAY } from '../../constant/colors';
import Icon from '../../components/common/native-component/Icon';
import tw from 'twrnc';

interface Props {
  keyword: string;
  setKeyword: (value: string) => void;
  setSearchedFoods: (results: Food[]) => void;
}

export default function SearchFoodSection({
  keyword,
  setKeyword,
  setSearchedFoods,
}: Props) {
  const { fridgeFoods } = useSelector((state) => state.fridgeFoods);
  const { pantryFoods } = useSelector((state) => state.pantryFoods);
  const allFoods = [...fridgeFoods, ...pantryFoods];

  const debounceSearch = debounce(() => {
    const results = findMatchNameFoods(allFoods, keyword);
    setSearchedFoods(results);
  }, 300);

  useEffect(() => {
    debounceSearch();
  }, [keyword]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setKeyword('');
      };
    }, [])
  );

  const onSubmitEditing = () => {
    if (keyword === '') return;
    setKeyword(keyword);
  };

  return (
    <View style={tw`h-11`}>
      <TextInput
        value={keyword}
        onChangeText={setKeyword}
        placeholder='식료품이 갖고 있는지 검색해보세요.'
        blurOnSubmit={false}
        style={tw.style(
          `h-10 border-2 my-0.5 pl-8 border-slate-200 items-center justify-center`,
          shadowStyle(8)
        )}
        onSubmitEditing={onSubmitEditing}
      />
      <TouchableOpacity
        onPress={onSubmitEditing}
        style={tw`absolute top-3.2 left-2.5`}
        disabled={keyword === ''}
      >
        <Icon name='search' type='Octicons' size={17} color={MEDIUM_GRAY} />
      </TouchableOpacity>
    </View>
  );
}
