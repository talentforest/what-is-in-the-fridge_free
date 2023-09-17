import { View } from 'react-native';
import { Text, TouchableOpacity } from '../common/native-component';
import { AnimationState, useGetFoodList } from '../../hooks';
import { GRAY } from '../../constant/colors';
import { initialFood } from '../../constant/foodInfo';
import { useDispatch, useSelector } from '../../redux/hook';
import { addToShoppingList } from '../../redux/slice/shoppingListSlice';
import Icon from '../common/native-component/Icon';
import UUIDGenerator from 'react-native-uuid';
import tw from 'twrnc';
import { findMatchNameFoods } from '../../util';

interface Props {
  keyword: string;
  setAnimationState: (state: AnimationState) => void;
}

export default function TableRecommendedFoods({
  keyword,
  setAnimationState,
}: Props) {
  const { favoriteFoods, getFilteredFoodList, allExpiredFoods } =
    useGetFoodList();
  const { shoppingList } = useSelector((state) => state.shoppingList);

  const dispatch = useDispatch();
  const myUuid = UUIDGenerator.v4();

  const notExistFavFoods = getFilteredFoodList('없는 식료품', favoriteFoods);
  const allRecommendedFoods = [...notExistFavFoods, ...allExpiredFoods()];
  const foodsExceptShoppingList = allRecommendedFoods.filter(
    (food) => !shoppingList.find((item) => item.name === food.name)
  );

  const findMatchName = findMatchNameFoods(foodsExceptShoppingList, keyword);
  const recommendList = !!findMatchName?.length
    ? findMatchName
    : foodsExceptShoppingList;

  const onPress = (keyword: string) => {
    const food = {
      ...initialFood,
      id: myUuid as string,
      name: keyword,
    };
    dispatch(addToShoppingList(food));
    setAnimationState('slidedown-in');
  };

  const LIST_MAX_NUM = 7;

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
              onPress(food.name);
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
