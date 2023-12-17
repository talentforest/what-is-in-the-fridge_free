import { Dispatch, useCallback, useEffect, useState } from 'react';
import { findMatchNameFoods } from '../../util';
import { View } from 'react-native';
import {
  TextInput,
  TouchableOpacity,
} from '../../components/common/native-component';
import { Food } from '../../constant/foodInfo';
import { useFocusEffect } from '@react-navigation/native';
import { shadowStyle } from '../../constant/shadowStyle';
import { MEDIUM_INDIGO } from '../../constant/colors';
import { useFindFood } from '../../hooks';

import Icon from '../../components/common/native-component/Icon';
import SearchedFoodList from './SearchedFoodList';
import tw from 'twrnc';

interface Props {
  closeSearchedList: boolean;
  setCloseSearchList: Dispatch<React.SetStateAction<boolean>>;
}

export default function SearchFoodSection({
  closeSearchedList,
  setCloseSearchList,
}: Props) {
  const [keyword, setKeyword] = useState('');
  const [searchedFoods, setSearchedFoods] = useState<Food[]>([]);

  const { allFoods } = useFindFood();

  useEffect(() => {
    const results = findMatchNameFoods(allFoods, keyword);
    setSearchedFoods(results);
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
    <View style={tw`absolute top-12 w-full`}>
      <View style={tw`h-11`}>
        <TextInput
          onFocus={() => setCloseSearchList(false)}
          value={keyword}
          onChangeText={setKeyword}
          placeholder='식료품을 갖고 있는지 검색해보세요'
          blurOnSubmit={false}
          fontSize={17}
          onSubmitEditing={onSubmitEditing}
          style={tw.style(
            `h-10 border-2 my-0.5 pl-8.5 border-indigo-200 text-slate-700 items-center justify-center`,
            shadowStyle(4)
          )}
        />
        <TouchableOpacity
          onPress={onSubmitEditing}
          style={tw`absolute top-0 left-2.5 justify-center h-full`}
          disabled={keyword === ''}
        >
          <Icon name='search' type='Octicons' size={16} color={MEDIUM_INDIGO} />
        </TouchableOpacity>
      </View>

      <SearchedFoodList
        keyword={keyword}
        searchedFoods={searchedFoods}
        closeSearchedList={closeSearchedList}
      />
    </View>
  );
}
