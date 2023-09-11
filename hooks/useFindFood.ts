import { useSelector } from '../redux/hook';

export const useFindFood = () => {
  const { pantryFoods } = useSelector((state) => state.pantryFoods);
  const { fridgeFoods } = useSelector((state) => state.fridgeFoods);
  const { favoriteFoods } = useSelector((state) => state.favoriteFoods);

  const findFoodInFridge = (name: string) => {
    return fridgeFoods.find((food) => food.name === name);
  };

  const findFoodInPantry = (name: string) => {
    return pantryFoods.find((food) => food.name === name);
  };

  const findFavoriteListItem = (name: string) => {
    return favoriteFoods.find((favoriteFood) => favoriteFood.name === name);
  };

  return {
    findFoodInFridge,
    findFoodInPantry,
    findFavoriteListItem,
  };
};
