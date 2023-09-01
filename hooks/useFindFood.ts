import { useSelector } from '../redux/hook';

export const useFindFood = () => {
  const { allFoods } = useSelector((state) => state.allFoods);
  const { favoriteFoods } = useSelector((state) => state.favoriteFoods);

  const findFoodInFridge = (name: string) => {
    return allFoods.find((food) => food.name === name);
  };

  const findFavoriteListItem = (name: string) => {
    return favoriteFoods.find((favoriteFood) => favoriteFood.name === name);
  };

  return {
    findFoodInFridge,
    findFavoriteListItem,
  };
};
