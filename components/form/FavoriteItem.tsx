import { View, Animated } from 'react-native';
import { LIGHT_BLUE } from '../../constant/colors';
import { useToggleAnimation, useFindFood } from '../../hooks';
import { ModalTitle } from '../modal/Modal';
import { useDispatch } from '../../redux/hook';
import {
  addFavorite,
  removeFavorite,
} from '../../redux/slice/favoriteFoodsSlice';
import { Food } from '../../constant/foodInfo';

import FormLabel from './FormLabel';
import FormMessage from './FormMessage';
import ToggleBtn from '../buttons/ToggleBtn';
import tw from 'twrnc';

interface Props {
  food: Food;
  title: ModalTitle;
  disabled?: boolean;
}

const MOVED_TRANSLATE_X = 88;

export default function FavoriteItem({ food, title, disabled }: Props) {
  const { isFavoriteItem } = useFindFood();
  const { name } = food;

  const { translateX } = useToggleAnimation({
    initialValue: 0,
    toValue: MOVED_TRANSLATE_X,
    active: !!isFavoriteItem(name),
  });

  const dispatch = useDispatch();

  const onTogglePress = (btnName: string) => {
    if (btnName === '맞아요') return dispatch(addFavorite(food));
    if (btnName === '아니에요') return dispatch(removeFavorite({ name }));
  };

  // 식료품 정보 수정 제외, 자주 먹는 식품이라면 수정 불가능하도록
  const disabledFavoriteBtn = isFavoriteItem(name) && disabled;
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
            check={
              btnNm === '맞아요'
                ? !!isFavoriteItem(name)
                : !!!isFavoriteItem(name)
            }
            onPress={() => onTogglePress(btnNm)}
            disabled={!!isFavoriteItem(name) && disabled}
          />
        ))}
      </View>

      {title !== '식료품 정보 수정' && !!isFavoriteItem(name) && (
        <FormMessage
          message='자주 먹는 식료품이므로 위의 정보가 자동으로 적용돼요.'
          color='green'
        />
      )}

      {title === '식료품 정보 수정' && !!isFavoriteItem(name) && (
        <FormMessage
          message={'자주 먹는 식료품 목록에 추가돼요.'}
          color='green'
        />
      )}
    </View>
  );
}
