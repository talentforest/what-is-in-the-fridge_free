import { useSelector } from '../redux/hook';

export const useFindFood = () => {
  const { allFoods } = useSelector((state) => state.allFoods);

  const findFoodInFridge = (name: string) => {
    return allFoods.find((food) => food.name === name);
  };

  return {
    findFoodInFridge,
  };
};
