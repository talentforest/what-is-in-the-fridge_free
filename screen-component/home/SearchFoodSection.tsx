import { useCallback, useEffect, useState } from 'react';
import { debounce, findMatchNameFoods } from '../../util';
import { useSelector } from '../../redux/hook';
import { Animated, ScrollView, View } from 'react-native';
import {
  Text,
  TextInput,
  TouchableOpacity,
} from '../../components/common/native-component';
import { Food } from '../../constant/foodInfo';
import { useSlideAnimation } from '../../hooks';
import { useFocusEffect } from '@react-navigation/native';
import { shadowStyle } from '../../constant/shadowStyle';

import Icon from '../../components/common/native-component/Icon';
import SearchedItem from './SearchedItem';
import tw from 'twrnc';

export default function SearchFoodSection() {
  const [keyword, setKeyword] = useState('');
  const [searchedFoods, setSearchedFoods] = useState<Food[]>([]);

  const { fridgeFoods } = useSelector((state) => state.fridgeFoods);
  const { pantryFoods } = useSelector((state) => state.pantryFoods);
  const allFoods = [...fridgeFoods, ...pantryFoods];

  const debounceSearch = debounce(() => {
    const results = findMatchNameFoods(allFoods, keyword);
    setSearchedFoods(results);
  }, 300);

  const { height } = useSlideAnimation({
    initialValue: !!keyword.length && !searchedFoods.length ? 32 : 0,
    toValue: 100,
    active: !!searchedFoods?.length && !!keyword.length,
  });

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
    <View style={tw`mb-4`}>
      <View>
        <TextInput
          value={keyword}
          onChangeText={setKeyword}
          placeholder='냉장고에 식료품이 있는지 검색해보세요.'
          blurOnSubmit={false}
          style={tw.style(
            `h-11 my-0.5 pl-10 border-slate-300 items-center justify-center`,
            shadowStyle(8)
          )}
          onSubmitEditing={onSubmitEditing}
        />
        <TouchableOpacity
          onPress={onSubmitEditing}
          style={tw`absolute top-3 left-3`}
          disabled={keyword === ''}
        >
          <Icon name='search' type='Ionicons' size={20} />
        </TouchableOpacity>
      </View>
      <Animated.View
        style={{ height, overflow: 'hidden', marginHorizontal: -16 }}
      >
        {!!searchedFoods?.length ? (
          <Text style={tw`h-8 text-sm text-blue-600 pl-6 pt-2 pb-1`}>
            {searchedFoods?.length}건의 검색결과가 있습니다.
          </Text>
        ) : (
          <Text style={tw`h-8 text-sm text-blue-600 pl-6 pt-2 pb-1`}>
            검색 결과가 없습니다.
          </Text>
        )}
        <ScrollView
          horizontal
          scrollEnabled
          contentContainerStyle={tw`px-4 pb-2 py-1 gap-2`}
          showsHorizontalScrollIndicator={false}
        >
          {!!searchedFoods?.length &&
            searchedFoods.map((food: Food) => (
              <SearchedItem key={food.id} food={food} />
            ))}
        </ScrollView>
      </Animated.View>
    </View>
  );
}