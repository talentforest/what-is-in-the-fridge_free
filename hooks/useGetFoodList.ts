import { Food } from '../constant/foods';
import { CompartmentNum, Space, SpaceType } from '../constant/fridgeInfo';
import { useSelector } from '../redux/hook';
import { Filter, expired, getLeftDays, leftThreeDays } from '../util';

export const useGetFoodList = () => {
  const { allFoods } = useSelector((state) => state.allFoods);
  const { favoriteFoods } = useSelector((state) => state.favoriteFoods);

  const orderExpirationDate = (list: Food[]) => {
    return list;
  };

  const matchFoodSpace = (
    food: Food,
    space: Space | SpaceType,
    compartmentNum?: CompartmentNum
  ) => {
    if (space === '냉동실') return food.space.includes('냉동실');
    if (space === '냉장실') return food.space.includes('냉장실');
    if (compartmentNum) {
      const matchSpace = food.space === space;
      const matchCompartment = food.compartmentNum === compartmentNum;
      return matchSpace && matchCompartment;
    }
    return food.space === space;
  };

  const getFoodList = (
    type: 'allFoods' | 'expiredFoods',
    space: SpaceType | Space,
    compartmentNum?: CompartmentNum
  ) => {
    const foods = type === 'allFoods' ? allFoods : allExpiredFoodList;
    const filteredFoods = foods.filter((food) =>
      matchFoodSpace(food, space, compartmentNum)
    );
    return orderExpirationDate(filteredFoods);
  };

  const findFoodInFridge = (name: string) => {
    return allFoods.find((food) => food.name === name);
  };

  const favoriteFoodsInFridge = favoriteFoods.filter(
    (food) => !!findFoodInFridge(food.name)
  );

  const favoriteFoodsNotInFridge = favoriteFoods.filter(
    (food) => !findFoodInFridge(food.name)
  );

  const allExpiredFoodList = allFoods.filter(
    (food) => getLeftDays(food.expiredDate) < 4
  );

  const getFilteredFoodList = (filter: Filter, foodList: Food[]) => {
    if (filter === '전체') return orderExpirationDate(foodList);

    if (filter === '냉장고에 있음') return favoriteFoodsInFridge;

    if (filter === '냉장고에 없음') return favoriteFoodsNotInFridge;

    if (filter === '냉동실' || filter === '냉장실')
      return getFoodList('expiredFoods', filter);

    if (filter === '유통기한 지남') {
      const list = foodList.filter((food) => expired(food.expiredDate));
      return orderExpirationDate(list);
    }

    if (filter === '유통기한 3일 이내') {
      const list = foodList.filter((food) => leftThreeDays(food.expiredDate));
      return orderExpirationDate(list);
    }

    const listByCategory = foodList.filter((food) => food.category === filter);
    return orderExpirationDate(listByCategory);
  };

  return {
    allFoods,
    allExpiredFoodList,
    favoriteFoods,
    getFoodList,
    getFilteredFoodList,
  };
};
