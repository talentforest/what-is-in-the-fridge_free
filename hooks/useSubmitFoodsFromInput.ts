import { Alert, Keyboard } from 'react-native';
import { useDispatch } from '../redux/hook';
import { addFavorite } from '../redux/slice/favoriteFoodsSlice';
import { initialFridgeFood } from '../constant/foodInfo';
import { Category } from '../constant/foodCategories';
import { addToShoppingList } from '../redux/slice/shoppingListSlice';
import { AnimationState } from './animation/useSetAnimationState';
import { alertPhraseWithFood } from '../constant/alertPhrase';
import { useFindFood } from './useFindFood';
import UUIDGenerator from 'react-native-uuid';

export const useSubmitFoodsFromInput = () => {
  const myUuid = UUIDGenerator.v4();

  const dispatch = useDispatch();

  const { isFavoriteItem, isShoppingListItem, findFood } = useFindFood();

  const onSubmitFavoriteListItem = (
    inputValue: string,
    category: Category,
    setInputValue: (value: string) => void,
    setShowCaution: (caution: boolean) => void
  ) => {
    if (inputValue === '') return Keyboard.dismiss();

    if (isFavoriteItem(inputValue)) return setShowCaution(true);

    const initialFavFood = {
      ...initialFridgeFood,
      name: inputValue,
      category,
    };

    const hasFood = findFood(inputValue);

    if (hasFood) {
      if (category !== hasFood.category) {
        const {
          modifyCategory: { title, msg },
        } = alertPhraseWithFood(hasFood);

        return Alert.alert(title, msg, [
          {
            text: '확인',
            onPress: () => {
              dispatch(addFavorite(hasFood));
              setInputValue('');
            },
            style: 'default',
          },
        ]);
      }

      dispatch(addFavorite({ ...initialFavFood, id: hasFood.id }));
      return setInputValue('');
    }

    const isShoppingListFood = isShoppingListItem(inputValue);

    if (isShoppingListFood) {
      dispatch(addFavorite({ ...initialFavFood, id: isShoppingListFood.id }));
      return setInputValue('');
    }

    dispatch(addFavorite({ ...initialFavFood, id: myUuid as string }));
    setInputValue('');
  };

  const onSubmitShoppingListItem = (
    name: string,
    setAnimationState: (state: AnimationState) => void
  ) => {
    const { expiredDate, purchaseDate } = initialFridgeFood;
    const initialFood = { ...initialFridgeFood, id: myUuid as string, name };
    const hasFood = { ...findFood(name), expiredDate, purchaseDate };
    const isFavoriteFood = isFavoriteItem(name);

    const food = Object.keys(findFood(name) || {}).length
      ? hasFood
      : Object.keys(isFavoriteFood || {}).length
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
