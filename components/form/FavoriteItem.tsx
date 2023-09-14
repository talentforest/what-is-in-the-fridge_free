import { View, Animated } from 'react-native';
import { LIGHT_BLUE } from '../../constant/colors';
import { useToggleAnimation, useFindFood } from '../../hooks';
import { Food } from '../../constant/foodInfo';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../redux/hook';
import { toggleFavorite } from '../../redux/slice/isFavoriteSlice';

import FormLabel from './FormLabel';
import FormMessage from './FormMessage';
import ToggleBtn from '../buttons/ToggleBtn';
import tw from 'twrnc';
import { ModalTitle } from '../modal/Modal';

interface Props {
  food: Food;
  title: ModalTitle;
}

const MOVED_TRANSLATE_X = 88;

export default function FavoriteItem({ food, title }: Props) {
  const { isFavorite } = useSelector((state) => state.isFavorite);
  const { isFavoriteItem } = useFindFood();
  const { name } = food;

  const { translateX } = useToggleAnimation({
    initialValue: 0,
    toValue: MOVED_TRANSLATE_X,
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
  const color = disabledFavoriteBtn ? 'border-slate-300' : 'border-blue-200';
  const backgroundColor = disabledFavoriteBtn ? LIGHT_BLUE : '#4070ff';

  return (
    <View>
      <FormLabel label='자주 먹는 식료품' />
      <View
        style={tw.style(
          `${color} h-10.5 flex-row items-center border p-1 rounded-full bg-white self-start`,
          {
            shadowColor: '#aaa',
            shadowOpacity: 0.3,
            shadowRadius: 3,
            shadowOffset: { height: 2, width: 0 },
          }
        )}
      >
        <Animated.View
          style={{
            transform: [{ translateX }],
            width: 88,
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
            onPress={() => onTogglePress(btnNm)}
            disabled={disabledFavoriteBtn}
          />
        ))}
      </View>

      {!title.includes('수정') && !!isFavoriteItem(name) && (
        <FormMessage
          message='자주 먹는 식료품이므로 위의 정보가 자동으로 적용돼요.'
          color='green'
        />
      )}

      {isFavorite && !isFavoriteItem(name) && (
        <FormMessage
          message={'자주 먹는 식료품 목록에 추가돼요.'}
          color='green'
        />
      )}
    </View>
  );
}
