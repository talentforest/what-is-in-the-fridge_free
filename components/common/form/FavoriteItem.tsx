import { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';
import { INDIGO, LIGHT_INDIGO } from '../../../constant/colors';
import { scaleH } from '../../../util';
import MessageBox from '../boxes/MessageBox';
import useFavoriteFoods from '../../../hooks/useFavoriteFoods';
import ToggleBtn from '../buttons/ToggleBtn';
import tw from 'twrnc';

interface Props {
  name: string;
  favoriteState: boolean;
  changeInfo: (newInfo: { [key: string]: boolean }) => void;
  disabled: boolean;
}

const MOVED_TRANSLATE_X = 88;

export default function FavoriteItem({
  name,
  favoriteState,
  changeInfo,
  disabled,
}: Props) {
  const { favoriteFoods } = useFavoriteFoods();

  // 식료품 이름을 적었는데 자주 먹는 식료품 이름일 경우
  const isFavoriteFood = favoriteFoods.find((food) => food.name === name);
  const currFavState =
    isFavoriteFood && disabled
      ? isFavoriteFood?.favorite // 기존 자주 먹는 식료품 상태
      : favoriteState; // 새로운 식료품 상태

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
        flex-row items-center border border-indigo-500 p-1 rounded-lg bg-white self-start`}
      >
        <Animated.View
          style={{
            transform: [{ translateX }],
            width: 88,
            position: 'absolute',
            left: 4,
            height: '100%',
            borderRadius: 10,
            backgroundColor: isFavoriteFood && disabled ? LIGHT_INDIGO : INDIGO,
          }}
        />
        {['맞아요', '아니에요'].map((btnNm) => (
          <ToggleBtn
            key={btnNm}
            check={btnNm === '맞아요' ? currFavState : !currFavState}
            onPress={() => onTogglePress(btnNm === '맞아요' ? true : false)}
            btnName={btnNm}
            disabled={isFavoriteFood?.favorite && disabled}
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
            isFavoriteFood && disabled
              ? '이미 자주 먹는 식료품에 등록되어 있어 변경할 수 없어요.'
              : isFavoriteFood
              ? '이미 자주 먹는 식료품에 등록되어 있어요.'
              : '자주 먹는 식료품 목록에 추가됩니다.'
          }
        />
      </Animated.View>
    </View>
  );
}
