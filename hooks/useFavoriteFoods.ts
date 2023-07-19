import { Food } from '../constant/foods';
import { useSelector } from '../redux/hook';
import useCheckFood from './useCheckFood';

export default function useFavoriteFoods() {
  const { favoriteFoods } = useSelector((state) => state.favoriteFoods);
  const { checkExistFood } = useCheckFood();

  const existFavoriteFoods = favoriteFoods.filter(
    (food) => !!checkExistFood(food)
  );

  const nonExistFavoriteFoods = favoriteFoods.filter(
    (food) => !checkExistFood(food)
  );

  const checkFavorite = (food: Food) =>
    !!favoriteFoods.find((favoriteFood) => favoriteFood.name === food.name);

  return {
    existFavoriteFoods,
    nonExistFavoriteFoods,
    favoriteFoods,
    checkFavorite,
  };
}
