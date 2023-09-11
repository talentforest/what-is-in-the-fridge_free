import { Food } from '../constant/foodInfo';
import { CompartmentNum, Space, SpaceType } from '../constant/fridgeInfo';
import { useSelector } from '../redux/hook';
import { Filter, expired, getLeftDays, leftThreeDays } from '../util';

export const useGetFoodList = () => {
  const { fridgeFoods } = useSelector((state) => state.fridgeFoods);
  const { favoriteFoods } = useSelector((state) => state.favoriteFoods);

  const orderExpirationDate = (list: Food[]) => {
    const sortedList = list?.sort(
      (food1, food2) =>
        new Date(food1.expiredDate).getTime() -
        new Date(food2.expiredDate).getTime()
    );
    return sortedList || list;
  };

  const allExpiredFridgeFoods = orderExpirationDate(
    fridgeFoods.filter((food) => getLeftDays(food.expiredDate) < 4)
  );

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
    type: 'fridgeFoods' | 'expiredFoods',
    space: SpaceType | Space,
    compartmentNum?: CompartmentNum
  ) => {
    const foodList =
      type === 'fridgeFoods' ? fridgeFoods : allExpiredFridgeFoods;

    const filteredFoods = foodList.filter((food) =>
      matchFoodSpace(food as Food, space, compartmentNum)
    );
    return filteredFoods;
  };

  const favoriteFoodsInFridge = favoriteFoods.filter(
    (favoriteFood) =>
      !!fridgeFoods.find((food) => food.name === favoriteFood.name)
  );

  const favoriteFoodsNotInFridge = favoriteFoods.filter(
    (favoriteFood) =>
      !!!fridgeFoods.find((food) => food.name === favoriteFood.name)
  );

  const getFilteredFoodList = (filter: Filter, foodList: Food[]) => {
    if (filter === '전체') return foodList;

    if (filter === '냉장고에 있음') return favoriteFoodsInFridge;
    if (filter === '냉장고에 없음') return favoriteFoodsNotInFridge;

    if (filter === '냉동실' || filter === '냉장실')
      return getFoodList('expiredFoods', filter);

    if (filter === '유통기한 만료') {
      const list = foodList.filter((food) => expired(food.expiredDate));
      return orderExpirationDate(list);
    }
    if (filter === '유통기한 3일 이내') {
      const list = foodList.filter((food) => leftThreeDays(food.expiredDate));
      return orderExpirationDate(list);
    }

    if (filter === '자주 먹는 식료품') {
      const list = foodList.filter((food) => !!food.favorite);
      return orderExpirationDate(list);
    }

    const listByCategory = foodList.filter((food) => food.category === filter);
    return orderExpirationDate(listByCategory);
  };

  return {
    fridgeFoods,
    allExpiredFridgeFoods,
    favoriteFoods,
    getFoodList,
    getFilteredFoodList,
  };
};
