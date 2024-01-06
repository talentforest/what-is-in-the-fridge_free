import { Animated, ScrollView } from 'react-native';
import { Text } from '../../components/common/native-component';
import { Food } from '../../constant/foodInfo';
import { useItemSlideAnimation } from '../../hooks';
import { shadowStyle } from '../../constant/shadowStyle';

import SearchedItem from './SearchedItem';
import tw from 'twrnc';

interface Props {
  closeSearchedList: boolean;
  keyword: string;
  searchedFoods: Food[];
}

export default function SearchedFoodList({
  keyword,
  searchedFoods,
  closeSearchedList,
}: Props) {
  const searchedItemsLength = searchedFoods?.length;

  const active = !!keyword.length && !closeSearchedList;

  const { height } = useItemSlideAnimation({
    initialValue: 0,
    toValue: !searchedItemsLength ? 30 : 87,
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
        {!!searchedItemsLength
          ? `${searchedItemsLength}건의 검색결과`
          : '검색결과가 없어요'}
      </Text>

      <ScrollView
        style={tw`w-full overflow-hidden`}
        horizontal
        scrollEnabled
        contentContainerStyle={tw`px-0.5 pb-2 py-1 gap-1.5`}
        showsHorizontalScrollIndicator={false}
      >
        {!!searchedItemsLength &&
          searchedFoods.map((food: Food) => (
            <SearchedItem key={food.id} food={food} />
          ))}
      </ScrollView>
    </Animated.View>
  );
}
