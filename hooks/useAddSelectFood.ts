import { Alert } from 'react-native';
import { useDispatch, useSelector } from '../redux/hook';
import { removeFromShoppingList } from '../redux/slice/shoppingList';
import { addFood, removeFood } from '../redux/slice/allFoodsSlice';
import { addFavorite } from '../redux/slice/favoriteFoodsSlice';
import { select } from '../redux/slice/selectedFoodSlice';
import { useRoute } from '@react-navigation/native';
import useCheckFood from './useCheckFood';
import UUIDGenerator from 'react-native-uuid';

export default function useAddSelectFood() {
  const { checkExistFood, alertExistFood } = useCheckFood();
  const { selectedFood } = useSelector((state) => state.selectedFood);
  const route = useRoute();

  const dispatch = useDispatch();
  const myUuid = UUIDGenerator.v4();

  const onChange = (info: { [key: string]: string | boolean }) => {
    dispatch(select({ ...selectedFood, ...info }));
  };

  const onSubmit = () => {
    const selectedFoodWithId = { ...selectedFood, id: myUuid as string };

    const existFood = checkExistFood(selectedFoodWithId);
    if (existFood) {
      if (route.name !== 'ShoppingList') return alertExistFood(existFood);
      dispatch(removeFood({ id: existFood.id, space: existFood.space }));
    }

    if (selectedFood.favorite) dispatch(addFavorite(selectedFoodWithId));
    dispatch(addFood(selectedFoodWithId));

    dispatch(removeFromShoppingList({ name: selectedFoodWithId.name }));

    Alert.alert(
      `${selectedFoodWithId.name}`,
      `${selectedFoodWithId.space} ${selectedFoodWithId.compartmentNum}에 추가되었습니다.`
    );
  };

  return {
    selectedFood,
    onChange,
    onSubmit,
  };
}
