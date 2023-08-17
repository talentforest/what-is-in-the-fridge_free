import { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';
import { INDIGO } from '../../../constant/colors';
import { scaleH } from '../../../util';
import MessageBox from '../boxes/MessageBox';
import useFavoriteFoods from '../../../hooks/useFavoriteFoods';
import ToggleBtn from '../buttons/ToggleBtn';
import tw from 'twrnc';

interface Props {
  name: string;
  favorite: boolean;
  changeInfo: (newInfo: { [key: string]: boolean }) => void;
}

const MOVED_TRANSLATE_X = 88;

export default function FavoriteItem({ name, favorite, changeInfo }: Props) {
  const { favoriteFoods } = useFavoriteFoods();
  const isFavoriteFood = favoriteFoods.find((food) => food.name === name);
  const currFavState = isFavoriteFood ? isFavoriteFood?.favorite : favorite;

  const height = useRef(new Animated.Value(currFavState ? 30 : 0)).current;
  const translateX = useRef(
    new Animated.Value(currFavState ? 0 : MOVED_TRANSLATE_X)
  ).current;

  const animatedBtn = (translateXValue: number) => {
    Animated.spring(translateX, {
      toValue: translateXValue,
      useNativeDriver: true,
    }).start();
  };

  const animatedGuide = (heightValue: number) => {
    Animated.timing(height, {
      toValue: heightValue,
      useNativeDriver: false,
      duration: 300,
    }).start();
  };

  const interpolatedOpacity = height.interpolate({
    inputRange: [0, 30],
    outputRange: [0, 1],
  });

  const onTogglePress = (favorite: boolean) => {
    changeInfo({ favorite });
    animatedBtn(favorite ? 0 : MOVED_TRANSLATE_X);
    animatedGuide(favorite ? 30 : 0);
  };

  useEffect(() => {
    if (currFavState) {
      animatedBtn(0);
      animatedGuide(30);
    } else {
      animatedBtn(MOVED_TRANSLATE_X);
      animatedGuide(0);
    }
  }, [name]);

  return (
    <View style={tw`mt-1 gap-1`}>
      <View
        style={tw`h-[${scaleH(40)}px] 
        flex-row items-center border border-indigo-500 p-1 rounded-full bg-white self-start`}
      >
        <Animated.View
          style={{
            transform: [{ translateX }],
            width: 88,
            position: 'absolute',
            left: 4,
            height: '100%',
            borderRadius: 100,
            backgroundColor: INDIGO,
          }}
        />
        {['맞아요', '아니에요'].map((btnNm) => (
          <ToggleBtn
            key={btnNm}
            check={btnNm === '맞아요' ? currFavState : !currFavState}
            onPress={() => onTogglePress(btnNm === '맞아요' ? true : false)}
            btnName={btnNm}
          />
        ))}
      </View>

      {/* 자주 먹는 식료품 추가 안내 문구 */}
      <Animated.View
        style={{
          height,
          opacity: interpolatedOpacity,
        }}
      >
        <MessageBox
          message={
            isFavoriteFood
              ? '이미 자주 먹는 식료품 목록에 있습니다.'
              : '자주 먹는 식료품 목록에 추가됩니다.'
          }
          color='text-blue-600'
        />
      </Animated.View>
    </View>
  );
}
