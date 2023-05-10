import { Food } from '../constant/foods';
import { useSelector } from '../redux/hook';

export default function useCheckFood() {
  const { fridgeFoods, freezerFoods } = useSelector((state) => state.allFoods);

  const allExistFoods = [...fridgeFoods, ...freezerFoods];

  const checkExistFood = (food: Food) => {
    return allExistFoods.find((existFood) => existFood.name === food.name);
  };

  return {
    checkExistFood,
  };
}
