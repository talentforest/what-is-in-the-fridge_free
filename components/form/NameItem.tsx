import { useDispatch, useSelector } from '../../redux/hook';
import { editFormFood } from '../../redux/slice/food/formFoodSlice';
import { View } from 'react-native';
import { TextInput } from '../common/native-component';
import { shadowStyle } from '../../constant/shadowStyle';
import { useRouteName } from '../../hooks/useRouteName';
import { NAME_MAX_LENGTH } from '../../constant/foodInfo';
import { useFindFood } from '../../hooks';
import { closeKeyboard } from '../../util';

import FormLabel from './FormLabel';
import FormMessage from './FormMessage';
import MatchedFavoriteFoodNameList from './MatchedFavoriteFoodNameList';
import tw from 'twrnc';

interface Props {
  isEditing: boolean;
}

export default function NameItem({ isEditing }: Props) {
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

  const hasFood = findFood(newName);

  const editedName = newName !== originName;

  const foodPosition =
    hasFood?.space === '실온보관'
      ? hasFood?.space
      : `${hasFood?.space} ${hasFood?.compartmentNum}칸`;

  const onMatchedFoodPress = (name: string) => {
    dispatch(editFormFood({ name }));
    closeKeyboard();
  };

  return (
    <View>
      <FormLabel label='식료품 이름' />

      <View>
        <View style={tw`flex-row gap-1`}>
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
            autoFocus={!isEditing}
          />
        </View>

        <View>
          <FormMessage
            active={newName.length >= NAME_MAX_LENGTH && editable}
            message={`식료품 이름은 ${NAME_MAX_LENGTH}자를 넘을 수 없어요`}
            color='orange'
          />

          <FormMessage
            active={
              isEditing ? !!hasFood?.space && editedName : !!hasFood?.space
            }
            message={
              !!hasFood?.space
                ? `위의 식료품은 이미 ${foodPosition}에 있어요.`
                : ''
            }
            color='orange'
          />
        </View>
      </View>

      {!isEditing && !isFavorite ? (
        <MatchedFavoriteFoodNameList
          name={newName}
          onPress={onMatchedFoodPress}
          compareWith='addNewFood'
        />
      ) : null}
    </View>
  );
}
