import { useDispatch, useSelector } from '../redux/hook';
import { addFavorite } from '../redux/slice/food-list/favoriteFoodsSlice';
import { initialFridgeFood } from '../constant/foodInfo';
import { addToShoppingList } from '../redux/slice/food-list/shoppingListSlice';
import { useFindFood } from './useFindFood';
import { useState } from 'react';
import { closeKeyboard } from '../util';
import { useHandleAlert } from './useHandleAlert';
import UUIDGenerator from 'react-native-uuid';

export const useSubmitFoodsFromInput = () => {
  const [inputValue, setInputValue] = useState('');
  const { category } = useSelector((state) => state.category);
  const { checkedList } = useSelector((state) => state.checkedList);

  const myUuid = UUIDGenerator.v4();

  const dispatch = useDispatch();

  const { alertWithFood, setAlert } = useHandleAlert();

  const { isFavoriteItem, isShoppingListItem, findFood } = useFindFood();

  const hasFood = findFood(inputValue);

  const onSubmitFavoriteListItem = () => {
    if (inputValue === '') return closeKeyboard();

    const initialFavFood = {
      ...initialFridgeFood,
      name: inputValue,
      category,
    };

    if (hasFood) {
      if (category !== hasFood.category) {
        const { alertChangeCategory } = alertWithFood(hasFood);
        setAlert(alertChangeCategory);
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

  const onSubmitShoppingListItem = (name: string) => {
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
  };

  const isActiveCaution = !!isFavoriteItem(inputValue) && !!!checkedList.length;

  return {
    isActiveCaution,
    inputValue,
    setInputValue,
    onSubmitFavoriteListItem,
    onSubmitShoppingListItem,
  };
};
