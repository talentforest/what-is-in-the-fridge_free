import { Food } from '../constant/foods';
import { Space } from '../constant/fridge';
import { useSelector } from '../redux/hook';

export default function useCheckFood() {
  const { fridgeFoods, freezerFoods } = useSelector((state) => state.allFoods);

  const allExistFoods = [...fridgeFoods, ...freezerFoods];
  const checkExistFood = (food: Food) => {
    const existFood = allExistFoods.find((existFood) => {
      return existFood.name === food.name;
    });
    return existFood;
  };

  return {
    checkExistFood,
  };
}
