import { Alert } from 'react-native';
import { useDispatch, useSelector } from '../redux/hook';
import { removeFromShoppingList } from '../redux/slice/shoppingListSlice';
import {
  addFridgeFood,
  removeFridgeFood,
} from '../redux/slice/fridgeFoodsSlice';
import { addFavorite, removeFavorite } from '../redux/slice/favoriteFoodsSlice';
import { select } from '../redux/slice/selectedFoodSlice';
import { useRoute } from '@react-navigation/native';
import { addToPantry } from '../redux/slice/pantryFoodsSlice';
import { Food } from '../constant/foodInfo';
import UUIDGenerator from 'react-native-uuid';
import { alertPhrase, alertPhraseWithFood } from '../constant/alertPhrase';

export const useAddSelectFood = () => {
  const { fridgeFoods } = useSelector((state) => state.fridgeFoods);
  const { selectedFood } = useSelector((state) => state.selectedFood);
  const dispatch = useDispatch();
  const route = useRoute();

  const myUuid = UUIDGenerator.v4();

  const onChange = (info: { [key: string]: string | boolean }) => {
    dispatch(select({ ...selectedFood, ...info }));
  };

  const alertExistFood = (food: Food) => {
    const { exist } = alertPhraseWithFood(food);
    return Alert.alert(exist.title, exist.msg);
  };

  const onSubmit = (
    setModalVisible: (visible: boolean) => void,
    setCheckedList: (checkedList: Food[]) => void
  ) => {
    const foodWithNewId = { ...selectedFood, id: myUuid as string };
    const { expiredDate, purchaseDate } = foodWithNewId;

    const { wrongDate } = alertPhrase;
    if (new Date(expiredDate).getTime() < new Date(purchaseDate).getTime()) {
      return Alert.alert(wrongDate.title, wrongDate.msg);
    }

    const existFood = fridgeFoods.find(
      (food) => food.name === foodWithNewId.name
    );
    if (existFood) {
      if (route.name !== 'ShoppingList') return alertExistFood(existFood);
      dispatch(removeFridgeFood({ id: existFood.id }));
    }

    if (selectedFood.favorite) {
      dispatch(addFavorite(foodWithNewId));
    } else {
      dispatch(removeFavorite(foodWithNewId));
    }

    if (selectedFood.compartmentNum) {
      dispatch(addFridgeFood(foodWithNewId));
    } else {
      dispatch(addToPantry(foodWithNewId));
    }
    dispatch(removeFromShoppingList({ name: foodWithNewId.name }));

    const position = foodWithNewId.compartmentNum
      ? `${foodWithNewId.space} ${foodWithNewId.compartmentNum}`
      : `${foodWithNewId.space}`;

    const { successAdd } = alertPhraseWithFood(foodWithNewId);

    Alert.alert(successAdd.title, `${position}에 추가되었어요.`);

    setModalVisible(false);
    setCheckedList([]);
  };

  return {
    selectedFood,
    onChange,
    onSubmit,
  };
};
