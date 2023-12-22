import { useFindFood } from '../../hooks';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../redux/hook';
import { toggleFavorite } from '../../redux/slice/food/isFavoriteSlice';
import { closeKeyboard } from '../../util';
import { shadowStyle } from '../../constant/shadowStyle';
import { TouchableOpacity } from '../common/native-component';
import { DARK_WHITE, YELLOW } from '../../constant/colors';

import Icon from '../common/native-component/Icon';
import tw from 'twrnc';

interface Props {
  isEditing?: boolean;
}

export default function FavoriteItem({ isEditing }: Props) {
  const {
    formFood,
    originFood: { name: originName },
  } = useSelector((state) => state.formFood);
  const { isFavorite } = useSelector((state) => state.isFavorite);

  const name = isEditing ? originName : formFood.name;

  const { isFavoriteItem } = useFindFood();

  const dispatch = useDispatch();

  const onTogglePress = (isFavorite: boolean) => {
    closeKeyboard();
    return dispatch(toggleFavorite(!isFavorite));
  };

  useEffect(() => {
    if (isFavoriteItem(name)) {
      dispatch(toggleFavorite(true));
    } else {
      dispatch(toggleFavorite(false));
    }
  }, [name]);

  // 식료품에 대한 정보 "수정"에서만 자주 먹는 식료품 설정을 변경할 수 있다.
  const disabledFavoriteBtn = isFavoriteItem(name) && !isEditing;

  return (
    <TouchableOpacity
      disabled={disabledFavoriteBtn}
      onPress={() => onTogglePress(isFavorite)}
      style={tw.style(
        `h-10 border border-slate-100 bg-white ${
          disabledFavoriteBtn ? 'border-slate-200 bg-gray-50' : ''
        } aspect-square items-center justify-center rounded-xl`,
        shadowStyle(3)
      )}
    >
      <Icon
        name={isFavorite ? 'star-fill' : 'star'}
        type='Octicons'
        size={16}
        color={
          disabledFavoriteBtn ? '#b1b1b1' : isFavorite ? YELLOW : DARK_WHITE
        }
      />
    </TouchableOpacity>
  );
}
