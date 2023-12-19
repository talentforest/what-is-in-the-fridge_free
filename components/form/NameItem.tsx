import { useDispatch, useSelector } from '../../redux/hook';
import { editFormFood } from '../../redux/slice/food/formFoodSlice';
import { View } from 'react-native';
import { TextInput } from '../common/native-component';
import { shadowStyle } from '../../constant/shadowStyle';
import { useRouteName } from '../../hooks/useRouteName';
import { NAME_MAX_LENGTH } from '../../constant/foodInfo';
import { ReactNode } from 'react';

import FormLabel from './FormLabel';
import FormMessage from './FormMessage';
import MatchedFavoriteFoodNameList from './MatchedFavoriteFoodNameList';
import tw from 'twrnc';
import { useFindFood } from '../../hooks';

interface Props {
  isEditing: boolean;
  children?: ReactNode;
}

export default function NameItem({ isEditing, children }: Props) {
  const {
    formFood: { name: newName },
    originFood: { name: originName },
  } = useSelector((state) => state.formFood);
  const { isFavorite } = useSelector((state) => state.isFavorite);

  const name = isEditing ? originName : newName;

  const { isFavoriteItem } = useFindFood();

  const dispatch = useDispatch();

  const onChangeText = (value: string) => {
    dispatch(editFormFood({ name: value }));
  };

  const { routeHome } = useRouteName();

  const editable = !routeHome;

  return (
    <View>
      <FormLabel label='식료품 이름' />

      <View style={tw``}>
        <View style={tw`flex-row gap-0.5`}>
          {children}

          <TextInput
            style={tw.style(
              `text-slate-${editable ? '900' : '400'} flex-1`,
              shadowStyle(3)
            )}
            onChangeText={onChangeText}
            value={name}
            placeholder='식료품 이름을 작성해주세요'
            focusable={false}
            maxLength={NAME_MAX_LENGTH}
            editable={editable}
          />
        </View>

        <FormMessage
          active={newName.length >= NAME_MAX_LENGTH && editable}
          message={`식료품 이름은 ${NAME_MAX_LENGTH}자를 넘을 수 없어요`}
          color='orange'
        />

        <FormMessage
          active={!isEditing && !!isFavoriteItem(name)}
          message='자주 먹는 식료품이므로 자동으로 정보가 적용되었어요'
          color='green'
        />

        <FormMessage
          active={isFavorite && !isFavoriteItem(name)}
          message={'자주 먹는 식료품 목록에 추가돼요'}
          color='green'
        />

        <FormMessage
          active={
            !isFavorite && !!isFavoriteItem(name) && originName !== newName
          }
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

      {!isEditing && !isFavorite ? <MatchedFavoriteFoodNameList /> : null}
    </View>
  );
}
