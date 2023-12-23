import { useDispatch, useSelector } from '../../redux/hook';
import { editFormFood } from '../../redux/slice/food/formFoodSlice';
import { View } from 'react-native';
import { TextInput } from '../common/native-component';
import { shadowStyle } from '../../constant/shadowStyle';
import { useRouteName } from '../../hooks/useRouteName';
import { NAME_MAX_LENGTH } from '../../constant/foodInfo';
import { ReactNode } from 'react';
import { useFindFood } from '../../hooks';

import FormLabel from './FormLabel';
import FormMessage from './FormMessage';
import MatchedFavoriteFoodNameList from './MatchedFavoriteFoodNameList';
import tw from 'twrnc';

interface Props {
  isEditing: boolean;
  children?: ReactNode;
  recommendListHeight?: number;
  setRecommendListHeight?: React.Dispatch<React.SetStateAction<number>>;
}

export default function NameItem({
  isEditing,
  children,
  recommendListHeight,
  setRecommendListHeight,
}: Props) {
  const {
    formFood: { name: newName },
    originFood: { name: originName },
  } = useSelector((state) => state.formFood);
  const { isFavorite } = useSelector((state) => state.isFavorite);

  const dispatch = useDispatch();

  const { findFood } = useFindFood();

  const onChangeText = (value: string) => {
    dispatch(editFormFood({ name: value }));
  };

  const { routeHome } = useRouteName();

  const editable = !routeHome;

  const { isFavoriteItem } = useFindFood();

  const name = isEditing ? originName : newName;

  const hasFood = findFood(newName);

  const editedName = newName !== originName;

  const foodPosition =
    hasFood?.space === '실온보관'
      ? hasFood?.space
      : `${hasFood?.space} ${hasFood?.compartmentNum}`;

  return (
    <View>
      <FormLabel label='식료품 이름' />

      <View>
        <View style={tw`flex-row gap-1`}>
          {children}

          <TextInput
            style={tw.style(
              `text-slate-${editable ? '900' : '400'} flex-1`,
              shadowStyle(3)
            )}
            onChangeText={onChangeText}
            value={newName}
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
          active={!!hasFood?.space && editedName}
          message={
            !!hasFood?.space
              ? `위의 식료품은 이미 ${foodPosition}에 있어요.`
              : ''
          }
          color='orange'
        />

        <FormMessage
          active={!isEditing && !!isFavoriteItem(name) && !hasFood}
          message='자주 먹는 식료품이므로 자동으로 정보가 적용되었어요'
          color='green'
        />

        <FormMessage
          active={isFavorite && !isFavoriteItem(name) && !hasFood}
          message={'자주 먹는 식료품 목록에 추가돼요'}
          color='green'
        />

        <FormMessage
          active={!isFavorite && !!isFavoriteItem(name) && editedName}
          message={`"${originName}" 식료품이 자주 먹는 식료품 목록에서 삭제돼요`}
          color='orange'
        />

        <FormMessage
          active={
            isFavorite &&
            isEditing &&
            !hasFood &&
            !!isFavoriteItem(name) &&
            editedName
          }
          message={`자주 먹는 식료품 목록에서도 "${originName}" 이름이 변경돼요`}
          color='orange'
        />
      </View>

      {!isEditing && !isFavorite ? (
        <MatchedFavoriteFoodNameList
          recommendListHeight={recommendListHeight}
          setRecommendListHeight={setRecommendListHeight}
        />
      ) : null}
    </View>
  );
}
