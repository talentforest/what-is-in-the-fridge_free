import { Animated, ScrollView, View } from 'react-native';
import { useFindFood, useItemSlideAnimation } from '../../hooks';
import { cutLetter, findMatchNameFoods } from '../../util';
import { useSelector } from '../../redux/hook';
import { Text, TouchableOpacity } from '../common/native-component';
import { shadowStyle } from '../../constant/shadowStyle';
import { GRAY } from '../../constant/colors';

import Icon from '../common/native-component/Icon';
import tw from 'twrnc';

const FAV_ITEM_MAX = 4;

interface Props {
  name: string;
  onPress: (name: string) => void;
  compareWith: 'shoppingList' | 'addNewFood';
}

export default function MatchedFavoriteFoodNameList({
  name,
  onPress,
  compareWith,
}: Props) {
  const { favoriteFoods } = useSelector((state) => state.favoriteFoods);

  const { isFavoriteItem, isShoppingListItem, findFood } = useFindFood();

  const isInList =
    compareWith === 'shoppingList'
      ? isShoppingListItem(name)
      : isFavoriteItem(name);

  // 추천리스트 생성
  const matchedFoodList = findMatchNameFoods(favoriteFoods, name)
    .filter((food) => !findFood(food.name)) // 이미 갖고 있는 식료품 제외
    .filter((food) =>
      compareWith === 'shoppingList' ? !isShoppingListItem(food.name) : food
    ); // 이미 리스트(shoppingList)에 있는 식료품 제외

  const { height } = useItemSlideAnimation({
    initialValue: 0,
    toValue: 44,
    active: !!matchedFoodList?.length,
  });

  return (
    <View>
      {!isInList && (
        <View
          style={tw`${
            !!matchedFoodList.length
              ? compareWith === 'shoppingList'
                ? '-mt-4 px-4 w-full self-center'
                : ''
              : ''
          }`}
        >
          <Animated.View style={tw.style(`overflow-hidden`, { height })}>
            {!!matchedFoodList?.length && (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={tw`overflow-hidden border`}
                contentContainerStyle={tw`gap-1 self-center pb-0.5`}
                nestedScrollEnabled
              >
                {matchedFoodList.slice(0, FAV_ITEM_MAX).map((food) => (
                  <TouchableOpacity
                    key={food.id}
                    style={tw.style(
                      `h-7.5 border border-blue-200 flex-row items-center bg-blue-100 gap-0.5 px-2 rounded-full`,
                      shadowStyle(4)
                    )}
                    onPress={() => onPress(food.name)}
                  >
                    <Icon
                      name={food.name === name ? 'check' : 'plus'}
                      type='Octicons'
                      size={13}
                    />
                    <Text fontSize={14} style={tw.style(`text-blue-700`)}>
                      {cutLetter(food.name, 8)}
                    </Text>
                  </TouchableOpacity>
                ))}

                {matchedFoodList.length > FAV_ITEM_MAX && (
                  <View style={tw`flex-row items-center`}>
                    <Icon name='plus' type='Octicons' size={13} color={GRAY} />
                    <Text fontSize={15} style={tw`text-slate-600`}>
                      {matchedFoodList.length - FAV_ITEM_MAX}개
                    </Text>
                  </View>
                )}
              </ScrollView>
            )}
          </Animated.View>
        </View>
      )}
    </View>
  );
}
