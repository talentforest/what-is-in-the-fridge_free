import { Alert } from 'react-native';
import { useDispatch, useSelector } from '../redux/hook';
import { removeFromShoppingList } from '../redux/slice/shoppingListSlice';
import {
  addFridgeFood,
  removeFridgeFood,
} from '../redux/slice/fridgeFoodsSlice';
import { select } from '../redux/slice/selectedFoodSlice';
import { useRoute } from '@react-navigation/native';
import { addToPantry, removePantryFood } from '../redux/slice/pantryFoodsSlice';
import { Food } from '../constant/foodInfo';
import { alertPhrase, alertPhraseWithFood } from '../constant/alertPhrase';
import {
  addFavorite,
  editFavorite,
  removeFavorite,
} from '../redux/slice/favoriteFoodsSlice';

export const useAddShoppingListFood = () => {
  const { pantryFoods } = useSelector((state) => state.pantryFoods);
  const { fridgeFoods } = useSelector((state) => state.fridgeFoods);
  const { selectedFood } = useSelector((state) => state.selectedFood);
  const { isFavorite } = useSelector((state) => state.isFavorite);
  const { favoriteFoods } = useSelector((state) => state.favoriteFoods);

  const dispatch = useDispatch();
  const route = useRoute();

  const onChange = (info: { [key: string]: string | boolean }) => {
    dispatch(select({ ...selectedFood, ...info }));
  };

  const isFavoriteItem = (name: string) =>
    favoriteFoods.find((food) => food.name === name);

  const onSubmit = (
    setModalVisible: (visible: boolean) => void,
    setCheckedList: (checkedList: Food[]) => void
  ) => {
    // 기존 식료품 삭제
    const existFood = [...fridgeFoods, ...pantryFoods].find(
      (food) => food.name === selectedFood.name
    );
    if (existFood) {
      if (route.name !== 'ShoppingList') {
        const { exist } = alertPhraseWithFood(existFood);
        return Alert.alert(exist.title, exist.msg);
      }
      existFood.space === '팬트리'
        ? dispatch(removePantryFood({ id: existFood.id }))
        : dispatch(removeFridgeFood({ id: existFood.id }));
    }

    const { expiredDate, purchaseDate, space } = selectedFood;

    const { wrongDate } = alertPhrase;
    if (new Date(expiredDate).getTime() < new Date(purchaseDate).getTime()) {
      return Alert.alert(wrongDate.title, wrongDate.msg);
    }

    isFavorite
      ? dispatch(addFavorite(selectedFood))
      : dispatch(removeFavorite(selectedFood));

    if (isFavoriteItem(selectedFood.name)) dispatch(editFavorite(selectedFood));

    dispatch(
      selectedFood.space === '팬트리'
        ? addToPantry(selectedFood)
        : addFridgeFood(selectedFood)
    );
    dispatch(removeFromShoppingList({ name: selectedFood.name }));

    const position =
      selectedFood.space === '팬트리'
        ? `${space}`
        : `${space} ${selectedFood.compartmentNum}`;

    const { successAdd } = alertPhraseWithFood(selectedFood);
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
