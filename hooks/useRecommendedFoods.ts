import { useSelector } from '../redux/hook';
import useCheckFood from './useCheckFood';

export default function useRecommendedFoods() {
  const { checkExistFood } = useCheckFood();
  const { shoppingList } = useSelector((state) => state.shoppingList);
  const { favoriteFoods } = useSelector((state) => state.favoriteFoods);

  const existInShoppingList = (name: string) => {
    return shoppingList.find((food) => food.name === name);
  };

  const getRecommendedShoppingList = () => {
    return favoriteFoods.filter((food) => {
      return !checkExistFood(food) && !existInShoppingList(food.name);
    });
  };

  return {
    existInShoppingList,
    getRecommendedShoppingList,
  };
}
