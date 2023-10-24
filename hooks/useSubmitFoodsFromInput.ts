import { Alert, Keyboard } from 'react-native';
import { useDispatch, useSelector } from '../redux/hook';
import { addFavorite } from '../redux/slice/favoriteFoodsSlice';
import { Food, initialFridgeFood } from '../constant/foodInfo';
import { Category } from '../constant/foodCategories';
import { addToShoppingList } from '../redux/slice/shoppingListSlice';
import { AnimationState } from './animation/useSetAnimationState';
import { alertPhraseWithFood } from '../constant/alertPhrase';
import UUIDGenerator from 'react-native-uuid';

export const useSubmitFoodsFromInput = () => {
  const { pantryFoods } = useSelector((state) => state.pantryFoods);
  const { fridgeFoods } = useSelector((state) => state.fridgeFoods);
  const { favoriteFoods } = useSelector((state) => state.favoriteFoods);

  const dispatch = useDispatch();
  const myUuid = UUIDGenerator.v4();

  const findFood = (name: string) => {
    return [...pantryFoods, ...fridgeFoods].find((food) => food.name === name);
  };

  const onSubmitFavoriteListItem = (
    inputValue: string,
    category: Category,
    setInputValue: (value: string) => void,
    setShowCaution: (caution: boolean) => void
  ) => {
    if (inputValue === '') return Keyboard.dismiss();

    const existFavoriteFood = favoriteFoods.find(
      (food) => food.name === inputValue
    );
    if (existFavoriteFood) return setShowCaution(true);

    if (findFood(inputValue) && category !== findFood(inputValue)?.category) {
      const {
        modifyCategory: { title, msg },
      } = alertPhraseWithFood(findFood(inputValue) as Food);

      Alert.alert(title, msg, [
        {
          text: '확인',
          onPress: () => {
            dispatch(addFavorite(findFood(inputValue) as Food));
            setInputValue('');
          },
          style: 'default',
        },
      ]);
    } else {
      dispatch(
        addFavorite({
          ...initialFridgeFood,
          id: myUuid as string,
          name: inputValue,
          category,
        })
      );
      setInputValue('');
    }
  };

  const onSubmitShoppingListItem = (
    name: string,
    setAnimationState: (state: AnimationState) => void
  ) => {
    const { expiredDate, purchaseDate } = initialFridgeFood;
    const initialFood = { ...initialFridgeFood, id: myUuid as string, name };
    const isExistFood = { ...findFood(name), expiredDate, purchaseDate };
    const isFavoriteFood = favoriteFoods.find((food) => food.name === name);

    const food = Object.keys(findFood(name) || {}).length
      ? isExistFood
      : isFavoriteFood
      ? isFavoriteFood
      : initialFood; //

    dispatch(addToShoppingList(food));
    setAnimationState('slidedown-in');
  };

  return {
    onSubmitFavoriteListItem,
    onSubmitShoppingListItem,
  };
};
