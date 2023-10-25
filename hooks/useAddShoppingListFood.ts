import { Alert } from 'react-native';
import { useDispatch, useSelector } from '../redux/hook';
import { removeFromShoppingList } from '../redux/slice/shoppingListSlice';
import {
  addFridgeFood,
  removeFridgeFood,
} from '../redux/slice/fridgeFoodsSlice';
import { select } from '../redux/slice/selectedFoodSlice';
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

  const onChange = (info: { [key: string]: string | boolean }) => {
    dispatch(select({ ...selectedFood, ...info }));
  };

  const allFoods = [...fridgeFoods, ...pantryFoods];

  const existFood = allFoods.find((food) => food.name === selectedFood.name);

  const isFavoriteItem = (name: string) =>
    favoriteFoods.find((food) => food.name === name);

  const { wrongDate } = alertPhrase;

  const onSubmit = (
    setModalVisible: (visible: boolean) => void,
    setCheckedList: (checkedList: Food[]) => void
  ) => {
    const { expiredDate, purchaseDate, space } = selectedFood;

    // 기존 식료품 삭제
    if (existFood) {
      existFood.space === '팬트리'
        ? dispatch(removePantryFood(existFood.id))
        : dispatch(removeFridgeFood(existFood.id));
    }

    const isWrongDate =
      new Date(expiredDate).getTime() < new Date(purchaseDate).getTime();

    if (isWrongDate) {
      return Alert.alert(wrongDate.title, wrongDate.msg);
    }

    isFavorite
      ? dispatch(addFavorite(selectedFood))
      : dispatch(removeFavorite(selectedFood.name));

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
