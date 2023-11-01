import { Animated, ScrollView } from 'react-native';
import { Text } from '../../components/common/native-component';
import { Food } from '../../constant/foodInfo';
import { useSlideAnimation } from '../../hooks';
import { shadowStyle } from '../../constant/shadowStyle';

import SearchedItem from './SearchedItem';
import tw from 'twrnc';

export default function SearchedFoodList({ keyword, searchedFoods }) {
  const searchLength = searchedFoods?.length;

  const active = !!searchLength && !!keyword.length;

  const { height } = useSlideAnimation({
    initialValue: !!keyword.length && !searchLength ? 30 : 0,
    toValue: 87,
    active,
  });

  return (
    <Animated.View
      style={tw.style(
        `w-full pl-1.5 pr-2 bg-blue-100 rounded-xl overflow-hidden border-slate-300`,
        { height },
        shadowStyle(3)
      )}
    >
      <Text style={tw`text-sm text-blue-600 pl-2 pt-1`}>
        {!!searchLength
          ? `${searchLength}건의 검색결과`
          : '검색 결과가 없습니다.'}
      </Text>

      <ScrollView
        style={tw`w-full overflow-hidden`}
        horizontal
        scrollEnabled
        contentContainerStyle={tw`px-0.5 pb-2 py-1 gap-1.5`}
        showsHorizontalScrollIndicator={false}
      >
        {!!searchLength &&
          searchedFoods.map((food: Food) => (
            <SearchedItem key={food.id} food={food} />
          ))}
      </ScrollView>
    </Animated.View>
  );
}
