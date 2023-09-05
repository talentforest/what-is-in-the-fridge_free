import { Alert } from 'react-native';
import { useDispatch, useSelector } from '../redux/hook';
import { removeFromShoppingList } from '../redux/slice/shoppingListSlice';
import { addFood, removeFood } from '../redux/slice/allFoodsSlice';
import { addFavorite, removeFavorite } from '../redux/slice/favoriteFoodsSlice';
import { select } from '../redux/slice/selectedFoodSlice';
import { useRoute } from '@react-navigation/native';
import { Food } from '../constant/foods';
import UUIDGenerator from 'react-native-uuid';

export const useAddSelectFood = () => {
  const { allFoods } = useSelector((state) => state.allFoods);
  const { selectedFood } = useSelector((state) => state.selectedFood);
  const dispatch = useDispatch();
  const route = useRoute();

  const myUuid = UUIDGenerator.v4();

  const onChange = (info: { [key: string]: string | boolean }) => {
    dispatch(select({ ...selectedFood, ...info }));
  };

  const alertExistFood = (food: Food) => {
    return Alert.alert(
      `${food.name}`,
      `${food.space} ${food.compartmentNum}에 이미 식료품이 있어요.`
    );
  };

  const onSubmit = (
    setModalVisible: (visible: boolean) => void,
    setCheckedList: (checkedList: Food[]) => void
  ) => {
    const foodWithNewId = { ...selectedFood, id: myUuid as string };
    const { expiredDate, purchaseDate } = foodWithNewId;
    if (new Date(expiredDate).getTime() < new Date(purchaseDate).getTime()) {
      return Alert.alert(
        '날짜 수정 알림',
        '유통기한이 구매일보다 이전일 수 없어요.'
      );
    }

    const existFood = allFoods.find((food) => food.name === foodWithNewId.name);
    if (existFood) {
      if (route.name !== 'ShoppingList') return alertExistFood(existFood);
      dispatch(removeFood({ id: existFood.id, space: existFood.space }));
    }

    if (selectedFood.favorite) {
      dispatch(addFavorite(foodWithNewId));
    } else {
      dispatch(removeFavorite(foodWithNewId));
    }
    dispatch(addFood(foodWithNewId));
    dispatch(removeFromShoppingList({ name: foodWithNewId.name }));

    Alert.alert(
      `${foodWithNewId.name}`,
      `${foodWithNewId.space} ${foodWithNewId.compartmentNum}에 추가되었어요.`
    );

    setModalVisible(false);
    setCheckedList([]);
  };

  return {
    selectedFood,
    onChange,
    onSubmit,
  };
};
