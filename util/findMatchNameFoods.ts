import { Food } from '../constant/foodInfo';

export const findMatchNameFoods = (foodList: Food[], name: string) => {
  if (name.length === 0) return;
  return foodList.filter((food) => food.name.includes(name));
};
