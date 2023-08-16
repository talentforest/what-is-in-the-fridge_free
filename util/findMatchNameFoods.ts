import { Food } from '../constant/foods';

export const findMatchNameFoods = (foodList: Food[], name: string) => {
  if (name.length === 0) return;
  return foodList.filter((food) =>
    food.name.replaceAll(' ', '').includes(name)
  );
};
