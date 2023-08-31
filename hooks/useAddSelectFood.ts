import { Alert } from 'react-native';
import { useDispatch, useSelector } from '../redux/hook';
import { removeFromShoppingList } from '../redux/slice/shoppingList';
import { addFood, removeFood } from '../redux/slice/allFoodsSlice';
import { addFavorite, removeFavorite } from '../redux/slice/favoriteFoodsSlice';
import { select } from '../redux/slice/selectedFoodSlice';
import { useRoute } from '@react-navigation/native';

import useCheckFood from './useCheckFood';
import UUIDGenerator from 'react-native-uuid';

export default function useAddSelectFood() {
  const { findFoodInFridge, alertExistFood } = useCheckFood();
  const { selectedFood } = useSelector((state) => state.selectedFood);
  const route = useRoute();

  const dispatch = useDispatch();
  const myUuid = UUIDGenerator.v4();

  const onChange = (info: { [key: string]: string | boolean }) => {
    dispatch(select({ ...selectedFood, ...info }));
  };

  const onSubmit = (setModalVisible: (visible: boolean) => void) => {
    const selectedFoodWithId = { ...selectedFood, id: myUuid as string };

    const { expiredDate, purchaseDate } = selectedFoodWithId;
    if (new Date(expiredDate).getTime() < new Date(purchaseDate).getTime()) {
      return Alert.alert(
        '날짜 수정 알림',
        '유통기한이 구매일보다 이전일 수 없어요.'
      );
    }

    const existFood = findFoodInFridge(selectedFoodWithId.name);
    if (existFood) {
      if (route.name !== 'ShoppingList') return alertExistFood(existFood);
      dispatch(removeFood({ id: existFood.id, space: existFood.space }));
    }

    if (selectedFood.favorite) {
      dispatch(addFavorite(selectedFoodWithId));
    } else {
      dispatch(removeFavorite(selectedFoodWithId));
    }
    dispatch(addFood(selectedFoodWithId));
    dispatch(removeFromShoppingList({ name: selectedFoodWithId.name }));

    Alert.alert(
      `${selectedFoodWithId.name}`,
      `${selectedFoodWithId.space} ${selectedFoodWithId.compartmentNum}에 추가되었습니다.`
    );

    setModalVisible(false);
  };

  return {
    selectedFood,
    onChange,
    onSubmit,
  };
}
