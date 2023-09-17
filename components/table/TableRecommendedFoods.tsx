import { View } from 'react-native';
import { Text, TouchableOpacity } from '../common/native-component';
import { useGetFoodList } from '../../hooks';
import { GRAY } from '../../constant/colors';
import { useSelector } from '../../redux/hook';
import { findMatchNameFoods } from '../../util';
import Icon from '../common/native-component/Icon';
import tw from 'twrnc';

interface Props {
  keyword: string;
  submitShoppingListItem: (name: string) => void;
}

const LIST_MAX_NUM = 7;

export default function TableRecommendedFoods({
  keyword,
  submitShoppingListItem,
}: Props) {
  const { favoriteFoods, getFilteredFoodList, allExpiredFoods } =
    useGetFoodList();
  const { shoppingList } = useSelector((state) => state.shoppingList);

  const notExistFavFoods = getFilteredFoodList('없는 식료품', favoriteFoods);
  const allRecommendedFoods = [...notExistFavFoods, ...allExpiredFoods()];
  const foodsExceptShoppingList = allRecommendedFoods.filter(
    (food) => !shoppingList.find((item) => item.name === food.name)
  );

  const findMatchName = findMatchNameFoods(foodsExceptShoppingList, keyword);
  const recommendList = !!findMatchName?.length
    ? findMatchName
    : foodsExceptShoppingList;

  return !!recommendList.length ? (
    <View style={tw`mb-2`}>
      <Text style={tw`text-sm text-slate-600 ml-1 mb-1`}>
        장보기 추천 식료품
      </Text>

      <View style={tw`flex-row flex-wrap gap-1 items-center`}>
        {recommendList.slice(0, LIST_MAX_NUM).map((food) => (
          <TouchableOpacity
            style={tw`flex-row gap-0.5 items-center border border-slate-300 pl-2 pr-3 py-0.5 bg-white shadow-md rounded-full`}
            onPress={() => {
              submitShoppingListItem(food.name);
            }}
            key={food.id}
          >
            <Icon
              name='plus'
              type='MaterialCommunityIcons'
              size={18}
              color={GRAY}
            />
            <Text style={tw`text-[15px] text-slate-700`}>{food.name}</Text>
          </TouchableOpacity>
        ))}
        {recommendList.length > LIST_MAX_NUM && (
          <Text style={tw`text-slate-600 self-end text-[15px]`}>
            ... + {recommendList.length - LIST_MAX_NUM}개
          </Text>
        )}
      </View>
    </View>
  ) : (
    <></>
  );
}
