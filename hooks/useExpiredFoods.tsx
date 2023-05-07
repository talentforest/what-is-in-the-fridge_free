import { getLeftDays } from '../util';
import { Food } from '../constant/foods';
import { useSelector } from '../redux/hook';

export default function useExpiredFoods() {
  const { fridgeFoods, freezerFoods } = useSelector((state) => state.foodsList);

  const expiredFridgeFoods = fridgeFoods.filter((food: Food) => {
    return getLeftDays(food.expirationDate) < 4;
  });

  const expiredFreezerFoods = freezerFoods.filter((food: Food) => {
    return getLeftDays(food.expirationDate) < 4;
  });

  const allExpiredFoods = [...expiredFridgeFoods, ...expiredFreezerFoods];

  return {
    expiredFridgeFoods,
    expiredFreezerFoods,
    allExpiredFoods,
  };
}
