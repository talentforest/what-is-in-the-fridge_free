import { View } from 'react-native';
import { Text, TouchableOpacity } from '../common/native-component';
import { AnimationState, useGetFoodList } from '../../hooks';
import { GRAY } from '../../constant/colors';
import { useSelector } from '../../redux/hook';
import { cutLetter, findMatchNameFoods } from '../../util';
import { ScrollView } from 'react-native';
import Icon from '../common/native-component/Icon';
import tw from 'twrnc';

interface Props {
  keyword: string;
  onSubmitShoppingListItem: (
    name: string,
    setAnimationState: (state: AnimationState) => void
  ) => void;
  setAnimationState: (state: AnimationState) => void;
}

const LIST_MAX_NUM = 7;

export default function TableRecommendedFoods({
  keyword,
  onSubmitShoppingListItem,
  setAnimationState,
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
    <View style={tw`my-2`}>
      <Text style={tw`text-sm text-slate-600 ml-1 mb-1`}>
        장보기 추천 식료품
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={tw`pl-0.5 pr-5 gap-1`}
      >
        {recommendList.slice(0, LIST_MAX_NUM).map((food) => (
          <TouchableOpacity
            style={tw`flex-row gap-0.5 items-center border border-slate-300 pl-2 pr-3 py-0.5 bg-white shadow-md rounded-full`}
            onPress={() => {
              onSubmitShoppingListItem(food.name, setAnimationState);
            }}
            key={food.id}
          >
            <Icon
              name='plus'
              type='MaterialCommunityIcons'
              size={18}
              color={GRAY}
            />
            <Text style={tw`text-[15px] text-slate-700`}>
              {cutLetter(food.name, 16)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  ) : (
    <></>
  );
}
