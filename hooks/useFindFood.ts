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

  const findFood = (name: string) => {
    return [...pantryFoods, ...fridgeFoods].find((food) => food.name === name);
  };

  const isFavoriteItem = (name: string) => {
    return favoriteFoods.find((favoriteFood) => favoriteFood.name === name);
  };

  const allFoods = [...fridgeFoods, ...pantryFoods];

  const favoriteExistFoods = favoriteFoods.filter(
    (favoriteFood) => !!allFoods.find((food) => food.name === favoriteFood.name)
  );

  const favoriteNotExistFoods = favoriteFoods.filter(
    (favoriteFood) => !allFoods.find((food) => food.name === favoriteFood.name)
  );

  return {
    findFoodInFridge,
    findFoodInPantry,
    findFood,
    isFavoriteItem,
  };
};
