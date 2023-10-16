import { Food } from '../constant/foodInfo';

export const validFoodObj: (food: Food) => Food = (food: Food) => {
  if (food.space === '팬트리' && 'compartmentNum' in food) {
    const { compartmentNum, ...pantryFood } = food;
    return { ...pantryFood, space: '팬트리' };
  }
  return food;
};
