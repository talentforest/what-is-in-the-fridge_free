import { useDispatch, useSelector } from '../../redux/hook';
import { editFormFood } from '../../redux/slice/food/formFoodSlice';
import { View } from 'react-native';
import { TextInput } from '../common/native-component';
import { shadowStyle } from '../../constant/shadowStyle';
import { useRouteName } from '../../hooks/useRouteName';

import FormLabel from './FormLabel';
import FormMessage from './FormMessage';
import MatchedFavoriteFoodNameList from './MatchedFavoriteFoodNameList';
import tw from 'twrnc';

const NAME_MAX_LENGTH = 40;

interface Props {
  isEditing: boolean;
}

export default function NameItem({ isEditing }: Props) {
  const {
    formFood: { name },
  } = useSelector((state) => state.formFood);

  const dispatch = useDispatch();

  const onChangeText = (value: string) => {
    dispatch(editFormFood({ name: value }));
  };

  const { routeShoppingList } = useRouteName();

  const editable = !routeShoppingList;

  return (
    <View>
      <FormLabel label='식료품 이름' />

      <TextInput
        style={tw.style(
          `text-slate-${editable ? '900' : '400'}`,
          shadowStyle(3)
        )}
        onChangeText={onChangeText}
        value={name}
        placeholder='식료품 이름을 작성해주세요'
        focusable={false}
        maxLength={40}
        editable={editable}
      />

      <FormMessage
        active={name.length >= 40}
        message={`식료품 이름은 ${NAME_MAX_LENGTH}자를 넘을 수 없습니다.`}
        color='orange'
      />

      {!isEditing ? <MatchedFavoriteFoodNameList /> : null}
    </View>
  );
}
