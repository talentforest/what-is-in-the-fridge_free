import { Food } from '../constant/foodInfo';

const makeNameList = (list: Food[]) => {
  return list.map((food) => food.name).join(', ');
};

export const getNameListCanMarkEtc = (
  foods: Food[],
  etcCriteriaNum?: number
) => {
  if (!etcCriteriaNum) return makeNameList(foods);

  return foods.length > etcCriteriaNum
    ? `${makeNameList(foods.slice(0, etcCriteriaNum))} 등`
    : makeNameList(foods);
};
