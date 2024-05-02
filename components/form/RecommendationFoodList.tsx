import { Animated, LayoutChangeEvent, View } from 'react-native';
import { useEffect, useState } from 'react';
import { useItemSlideAnimation } from '../../hooks';
import { cutLetter } from '../../util';
import { useSelector } from '../../redux/hook';
import { Text, TouchableOpacity } from '../common/native-component';

import Icon from '../common/native-component/Icon';
import tw from 'twrnc';

const FAV_ITEM_MAX = 7;

interface Props {
  name: string;
  onPress: (name: string) => void;
}

export default function RecommendationFoodList({ name, onPress }: Props) {
  const { foodHistoryList } = useSelector((state) => state.foodHistoryList);

  const { favoriteFoods } = useSelector((state) => state.favoriteFoods);

  const [boxWidth, setBoxWidth] = useState(0);

  const [recommendationItemWidths, setRecommendationWidths] = useState<
    { name: string; width: number }[]
  >([]);

  const candidateFoodList = [...favoriteFoods, ...foodHistoryList].filter(
    (current, index, arr) =>
      arr.findIndex((item) => item.name === current.name) === index
  );

  // 이름에 맞는 추천리스트 생성
  const recommendationFoodList = candidateFoodList.filter(
    (food) => food.name.includes(name) && name !== ''
  );

  useEffect(() => {
    if (recommendationFoodList.length === 0) {
      return setRecommendationWidths([]);
    }
  }, [recommendationFoodList.length]);

  const onBoxItemLayout = (event: LayoutChangeEvent, name: string) => {
    const { width } = event.nativeEvent.layout;

    if (name !== '') {
      setRecommendationWidths((prev) => {
        return prev.find((item) => item.name === name)
          ? prev
          : [...prev, { name, width }];
      });
    }
  };

  const onBoxLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setBoxWidth(width);
  };

  const totalWidth = recommendationItemWidths.reduce(
    (sum, item) => sum + item.width,
    0
  );

  const onMatchedFoodPress = (name: string) => {
    setRecommendationWidths((prev) => prev.filter(({ name }) => name !== name));
    onPress(name);
  };

  const { height } = useItemSlideAnimation({
    initialValue: 0,
    toValue:
      recommendationFoodList.length === 1 || totalWidth < boxWidth ? 38 : 73,
    active: !!recommendationFoodList?.length,
  });

  return (
    <Animated.View
      style={tw.style(`overflow-hidden w-full flex justify-end`, {
        height,
      })}
    >
      {!!recommendationFoodList?.length && (
        <View
          onLayout={onBoxLayout}
          style={tw.style(
            `overflow-hidden flex-row items-end w-full flex-wrap-reverse gap-1 gap-y-1.5 py-1.5 px-1`
          )}
        >
          {recommendationFoodList.slice(0, FAV_ITEM_MAX).map((food) => (
            <TouchableOpacity
              key={food.name}
              style={tw.style(
                `h-7 border border-blue-200 shadow-sm flex-row items-center bg-blue-200 gap-0.5 px-2 rounded-full`
              )}
              onPress={() => onMatchedFoodPress(food.name)}
              onLayout={(event) => onBoxItemLayout(event, food.name)}
            >
              <Icon
                name={food.name === name ? 'check' : 'plus'}
                type='Octicons'
                size={13}
              />
              <Text fontSize={14} style={tw.style(`text-blue-700`)}>
                {cutLetter(food.name, 10)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </Animated.View>
  );
}
