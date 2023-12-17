import { View } from 'react-native';
import { useFindFood } from '../../hooks';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../redux/hook';
import { toggleFavorite } from '../../redux/slice/food/isFavoriteSlice';
import { closeKeyboard } from '../../util';

import FormLabel from './FormLabel';
import FormMessage from './FormMessage';
import ToggleBtn from '../buttons/ToggleBtn';
import tw from 'twrnc';
import {
  LIGHT_INDIGO,
  LIGHT_YELLOW,
  MEDIUM_INDIGO,
} from '../../constant/colors';

interface Props {
  isEditing: boolean;
}

export default function FavoriteItem({ isEditing }: Props) {
  const {
    formFood: { name: newName },
    originFood: { name: originName },
  } = useSelector((state) => state.formFood);
  const { isFavorite } = useSelector((state) => state.isFavorite);

  const name = isEditing ? originName : newName;

  const { isFavoriteItem } = useFindFood();

  const dispatch = useDispatch();

  const onTogglePress = (idx: number) => {
    closeKeyboard();
    if (idx === 0) return dispatch(toggleFavorite(true));
    if (idx === 1) return dispatch(toggleFavorite(false));
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
    <View>
      <FormLabel label='자주 먹는 식료품' />
      <View style={tw`h-10`}>
        <ToggleBtn
          toggleBtnName={['맞아요', '아니에요']}
          width={94}
          active={isFavorite}
          disabled={disabledFavoriteBtn}
          onTogglePress={onTogglePress}
          activeColor={LIGHT_YELLOW}
          inActiveColor={LIGHT_YELLOW}
        />
      </View>

      <FormMessage
        active={!isEditing && !!isFavoriteItem(name)}
        message='자주 먹는 식료품이므로 위의 정보가 자동으로 적용돼요'
        color='green'
      />

      <FormMessage
        active={isFavorite && !isFavoriteItem(name)}
        message={'자주 먹는 식료품 목록에 추가돼요'}
        color='green'
      />

      <FormMessage
        active={!isFavorite && !!isFavoriteItem(name) && originName !== newName}
        message={`"${originName}" 식료품이 자주 먹는 식료품 목록에서 삭제돼요`}
        color='orange'
      />

      <FormMessage
        active={
          isFavorite &&
          isEditing &&
          !!isFavoriteItem(name) &&
          originName !== newName
        }
        message={`자주 먹는 식료품 목록에서도 "${originName}" 이름이 변경돼요`}
        color='orange'
      />
    </View>
  );
}
