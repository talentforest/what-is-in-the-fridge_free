import { Animated, View } from 'react-native';
import { useFindFood, useItemSlideAnimation } from '../../hooks';
import { closeKeyboard, cutLetter, findMatchNameFoods } from '../../util';
import { useDispatch, useSelector } from '../../redux/hook';
import { Text, TouchableOpacity } from '../common/native-component';
import { editFormFood } from '../../redux/slice/food/formFoodSlice';
import { shadowStyle } from '../../constant/shadowStyle';

import Icon from '../common/native-component/Icon';
import tw from 'twrnc';

const FAV_ITEM_MAX = 2;

export default function MatchedFavoriteFoodNameList() {
  const { favoriteFoods } = useSelector((state) => state.favoriteFoods);
  const {
    formFood: { name },
  } = useSelector((state) => state.formFood);

  const dispatch = useDispatch();

  const { isFavoriteItem } = useFindFood();

  const onMatchedFoodPress = (name: string) => {
    dispatch(editFormFood({ name }));
    closeKeyboard();
  };

  const matchedFoodList = findMatchNameFoods(favoriteFoods, name);

  const { height } = useItemSlideAnimation({
    initialValue: 0,
    toValue: 46,
    active: !!matchedFoodList?.length,
  });

  return (
    <>
      {!isFavoriteItem(name) && (
        <Animated.View style={{ height, overflow: 'hidden' }}>
          {!!matchedFoodList?.length && (
            <View
              style={tw.style(
                `flex-wrap flex-row items-center mt-2 gap-1 px-0.5`
              )}
            >
              {matchedFoodList.slice(0, FAV_ITEM_MAX).map((food) => (
                <TouchableOpacity
                  key={food.id}
                  style={tw.style(
                    `max-w-full h-8 border border-blue-200 flex-row items-center bg-blue-100 px-2 rounded-full`,
                    shadowStyle(4)
                  )}
                  onPress={() => onMatchedFoodPress(food.name)}
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
                <Text fontSize={15} style={tw`ml-1 text-slate-800`}>
                  +{matchedFoodList.length - FAV_ITEM_MAX}개
                </Text>
              )}
            </View>
          )}
        </Animated.View>
      )}
    </>
  );
}
