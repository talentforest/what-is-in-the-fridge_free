import { useSelector } from '../redux/hook';
import { getLeftDays } from '../util';

export const useFindFood = () => {
  const { expiredSoonDay } = useSelector((state) => state.notification);
  const { pantryFoods } = useSelector((state) => state.pantryFoods);
  const { fridgeFoods } = useSelector((state) => state.fridgeFoods);
  const { favoriteFoods } = useSelector((state) => state.favoriteFoods);
  const { shoppingList } = useSelector((state) => state.shoppingList);
  const { checkedList } = useSelector((state) => state.checkedList);

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
    return favoriteFoods.find((food) => food.name === name);
  };

  const isShoppingListItem = (name: string) => {
    return shoppingList.find((food) => food.name === name);
  };

  const isCheckedItem = (id: string) => {
    return checkedList.find((food) => food.id === id);
  };

  const isExpiredSoonFood = (expiredDate: string) => {
    return (
      0 <= getLeftDays(expiredDate) &&
      getLeftDays(expiredDate) <= expiredSoonDay
    );
  };

  const isExpiredFood = (expiredDate: string) => {
    return 0 > getLeftDays(expiredDate);
  };

  const allFoods = [...fridgeFoods, ...pantryFoods];

  return {
    findFoodInFridge,
    findFoodInPantry,
    findFood,
    isFavoriteItem,
    isShoppingListItem,
    isCheckedItem,
    isExpiredSoonFood,
    isExpiredFood,
    allFoods,
  };
};
