import { Food } from '../constant/foods';
import { useSelector } from '../redux/hook';

export default function useFavoriteFoods() {
  const { fridgeFoods, freezerFoods } = useSelector((state) => state.foodsList);

  const favoriteFridgeFoods = fridgeFoods.filter((food: Food) => {
    return food.favorite === true;
  });

  const favoriteFreezerFoods = freezerFoods.filter((food: Food) => {
    return food.favorite === true;
  });

  const allFavoriteFoods = [...favoriteFreezerFoods, ...favoriteFridgeFoods];

  return {
    favoriteFridgeFoods,
    favoriteFreezerFoods,
    allFavoriteFoods,
  };
}
