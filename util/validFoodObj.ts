import { Food } from '../constant/foodInfo';

export const validFoodObj: (food: Food) => Food = (food: Food) => {
  if (food.space === '실온보관' && 'compartmentNum' in food) {
    const { compartmentNum, ...pantryFood } = food;
    return { ...pantryFood, space: '실온보관' };
  }
  return food;
};
