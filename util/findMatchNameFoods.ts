import { Food, PantryFood } from '../constant/foodInfo';

export const findMatchNameFoods = (
  foodList: (Food | PantryFood)[],
  name: string
) => {
  if (name.length === 0) return;
  return foodList.filter((food) => food.name.includes(name));
};
