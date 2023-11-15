import { Animated, Keyboard, View } from 'react-native';
import { useFindFood, useSlideAnimation } from '../../hooks';
import { cutLetter, findMatchNameFoods } from '../../util';
import { useSelector } from '../../redux/hook';
import { Text, TouchableOpacity } from '../common/native-component';
import { shadowStyle } from '../../constant/shadowStyle';

import Icon from '../common/native-component/Icon';
import tw from 'twrnc';

interface Props {
  name: string;
  changeInfo: (newInfo: { [key: string]: string }) => void;
}

const FAV_ITEM_MAX = 3;

export default function MatchedFavoriteFoodNameList({
  name,
  changeInfo,
}: Props) {
  const { favoriteFoods } = useSelector((state) => state.favoriteFoods);

  const matchedFoodList = findMatchNameFoods(favoriteFoods, name);

  const { height } = useSlideAnimation({
    initialValue: 0,
    toValue: (matchedFoodList || []).length >= 3 ? 80 : 46,
    active: !!matchedFoodList?.length,
  });

  const { isFavoriteItem } = useFindFood();

  return (
    <>
      {!isFavoriteItem(name) && (
        <Animated.View
          style={{
            height,
            overflow: 'hidden',
            marginBottom: !!matchedFoodList?.length ? -15 : 0,
          }}
        >
          {!!matchedFoodList?.length && (
            <View
              style={tw.style(
                `flex-row flex-wrap items-center mt-2 gap-1 px-0.5`
              )}
            >
              {matchedFoodList.slice(0, FAV_ITEM_MAX).map((food) => (
                <TouchableOpacity
                  key={food.id}
                  style={tw.style(
                    `max-w-full h-7 border border-blue-200 flex-row items-center bg-blue-100 px-2 rounded-full`,
                    shadowStyle(4)
                  )}
                  onPress={() => {
                    changeInfo({ name: food.name });
                    Keyboard.dismiss();
                  }}
                >
                  <Icon
                    name={food.name === name ? 'check' : 'plus'}
                    type='Octicons'
                    size={14}
                  />
                  <Text fontSize={14} style={tw.style(`text-blue-700`)}>
                    {cutLetter(food.name, 8)}
                  </Text>
                </TouchableOpacity>
              ))}
              {matchedFoodList.length > FAV_ITEM_MAX && (
                <Text fontSize={14} style={tw`ml-2 text-slate-800`}>
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
