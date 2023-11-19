import { useDispatch } from '../redux/hook';
import { addFavorite } from '../redux/slice/favoriteFoodsSlice';
import { initialFridgeFood } from '../constant/foodInfo';
import { Category } from '../constant/foodCategories';
import { addToShoppingList } from '../redux/slice/shoppingListSlice';
import { AnimationState } from './animation/useSetAnimationState';
import { alertPhraseWithFood } from '../constant/alertPhrase';
import { useFindFood } from './useFindFood';
import { setAlertInfo, toggleAlertModal } from '../redux/slice/alertModalSlice';
import { useState } from 'react';
import { closeKeyboard } from '../util';
import UUIDGenerator from 'react-native-uuid';

export const useSubmitFoodsFromInput = () => {
  const [inputValue, setInputValue] = useState('');

  const myUuid = UUIDGenerator.v4();

  const dispatch = useDispatch();

  const { isFavoriteItem, isShoppingListItem, findFood } = useFindFood();

  const isActiveCaution = !!isFavoriteItem(inputValue);

  const onSubmitFavoriteListItem = (category: Category) => {
    if (inputValue === '') return closeKeyboard();

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
        dispatch(toggleAlertModal(true));
        dispatch(setAlertInfo({ title, msg, btns: ['확인'] }));
        dispatch(addFavorite(hasFood));
        setInputValue('');
        return;
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
    isActiveCaution,
    inputValue,
    setInputValue,
    onSubmitFavoriteListItem,
    onSubmitShoppingListItem,
  };
};
