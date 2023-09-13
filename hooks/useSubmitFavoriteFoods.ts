import { Keyboard } from 'react-native';
import { useDispatch, useSelector } from '../redux/hook';
import { addFavorite } from '../redux/slice/favoriteFoodsSlice';
import { initialFood } from '../constant/foodInfo';
import { Category } from '../constant/foodCategories';
import UUIDGenerator from 'react-native-uuid';

export const useSubmitFavoriteFoods = () => {
  const { fridgeFoods } = useSelector((state) => state.fridgeFoods);
  const { favoriteFoods } = useSelector((state) => state.favoriteFoods);
  const dispatch = useDispatch();

  const myUuid = UUIDGenerator.v4();

  const existFavoriteFoods = favoriteFoods.filter(
    (favoriteFood) =>
      !!fridgeFoods.find((food) => food.name === favoriteFood.name)
  );

  const nonExistFavoriteFoods = favoriteFoods.filter(
    (favoriteFood) =>
      !fridgeFoods.find((food) => food.name === favoriteFood.name)
  );

  const onSubmitFavoriteListItem = (
    inputValue: string,
    category: Category | '',
    setInputValue: (value: string) => void,
    setCategory: (category: Category | '') => void,
    setShowCaution: (caution: boolean) => void
  ) => {
    if (inputValue === '') return Keyboard.dismiss();

    const favoriteFood = favoriteFoods.find((food) => food.name === inputValue);
    if (favoriteFood || category === '') return setShowCaution(true);

    dispatch(
      addFavorite({
        ...initialFood,
        id: myUuid as string,
        name: inputValue,
        category,
      })
    );

    setCategory('');
    setInputValue('');
  };

  return {
    existFavoriteFoods,
    nonExistFavoriteFoods,
    onSubmitFavoriteListItem,
  };
};
