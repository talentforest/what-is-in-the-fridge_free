import { View, Animated, Keyboard } from 'react-native';
import { ICE_BLUE, LIGHT_INDIGO } from '../../constant/colors';
import { useToggleAnimation, useFindFood } from '../../hooks';
import { Food } from '../../constant/foodInfo';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../redux/hook';
import { toggleFavorite } from '../../redux/slice/isFavoriteSlice';
import { ModalTitle } from '../modal/Modal';
import { shadowStyle } from '../../constant/shadowStyle';

import FormLabel from './FormLabel';
import FormMessage from './FormMessage';
import ToggleBtn from '../buttons/ToggleBtn';
import tw from 'twrnc';
import { InputStyle } from '../common/native-component';

interface Props {
  food: Food;
  title: ModalTitle;
}

const TOGGLE_BTN_WIDTH = 88;

export default function FavoriteItem({ food, title }: Props) {
  const { isFavorite } = useSelector((state) => state.isFavorite);
  const { isFavoriteItem } = useFindFood();
  const { name } = food;

  const { translateX } = useToggleAnimation({
    initialValue: 0,
    toValue: TOGGLE_BTN_WIDTH,
    active: isFavorite,
  });

  const dispatch = useDispatch();

  const onTogglePress = (btnName: string) => {
    if (btnName === '맞아요') return dispatch(toggleFavorite(true));
    if (btnName === '아니에요') return dispatch(toggleFavorite(false));
  };

  useEffect(() => {
    if (isFavoriteItem(name)) {
      dispatch(toggleFavorite(true));
    } else {
      dispatch(toggleFavorite(false));
    }
  }, [name]);

  // 식료품에 대한 정보 "수정"에서만 자주 먹는 식료품 설정을 변경할 수 있다.
  const disabledFavoriteBtn = isFavoriteItem(name) && !title.includes('수정');
  const backgroundColor = disabledFavoriteBtn ? ICE_BLUE : LIGHT_INDIGO;

  return (
    <View>
      <FormLabel label='자주 먹는 식료품' />
      <View
        style={tw.style(
          `${InputStyle} flex-row items-center p-1 rounded-full self-start`,
          shadowStyle(3)
        )}
      >
        <Animated.View
          style={{
            transform: [{ translateX }],
            width: TOGGLE_BTN_WIDTH,
            position: 'absolute',
            left: 4,
            height: '100%',
            borderRadius: 100,
            backgroundColor,
          }}
        />

        {['맞아요', '아니에요'].map((btnNm) => (
          <ToggleBtn
            key={btnNm}
            btnName={btnNm}
            check={btnNm === '맞아요' ? isFavorite : !isFavorite}
            onPress={() => {
              Keyboard.dismiss();
              onTogglePress(btnNm);
            }}
            disabled={disabledFavoriteBtn}
            width={TOGGLE_BTN_WIDTH}
          />
        ))}
      </View>

      <FormMessage
        active={!title.includes('수정') && !!isFavoriteItem(name)}
        message='자주 먹는 식료품이므로 위의 정보가 자동으로 적용돼요.'
        color='green'
      />

      <FormMessage
        active={isFavorite && !isFavoriteItem(name)}
        message={'자주 먹는 식료품 목록에 추가돼요.'}
        color='green'
      />
    </View>
  );
}
