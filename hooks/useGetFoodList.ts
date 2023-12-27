import { Category, foodCategories } from '../constant/foodCategories';
import { Food } from '../constant/foodInfo';
import { CompartmentNum, Space, SpaceType } from '../constant/fridgeInfo';
import { useSelector } from '../redux/hook';
import { Filter, expired, getLeftDays, leftThreeDays, leftWeek } from '../util';
import { useFindFood } from './useFindFood';
import { useRouteName } from './useRouteName';

export const useGetFoodList = () => {
  const { fridgeFoods } = useSelector((state) => state.fridgeFoods);
  const { pantryFoods } = useSelector((state) => state.pantryFoods);
  const { favoriteFoods } = useSelector((state) => state.favoriteFoods);
  const { filter } = useSelector((state) => state.filter);

  const { findFood } = useFindFood();

  const { routeFavoriteFoods } = useRouteName();

  const allFoods = [...fridgeFoods, ...pantryFoods];

  const allCautionFoods = allFoods.filter(
    (food) => getLeftDays(food.expiredDate) < 8
  );

  const threeLeftDaysFoods = allFoods.filter(
    (food) =>
      0 <= getLeftDays(food.expiredDate) && getLeftDays(food.expiredDate) < 4
  );

  const expiredFoods = allFoods.filter(
    (food) => getLeftDays(food.expiredDate) < 0
  );

  const getMatchedPositionFoods = (
    type: 'allFoods' | 'allCautionFoods',
    space: SpaceType | Space,
    compartmentNum?: CompartmentNum
  ) => {
    const foodList = type === 'allCautionFoods' ? allCautionFoods : allFoods;

    return foodList.filter((food) => {
      if (space === '냉동실') return food.space.includes('냉동실');
      if (space === '냉장실') return food.space.includes('냉장실');
      if (compartmentNum) {
        const matchedSpace = food.space === space;
        const matchedCompartment = food.compartmentNum === compartmentNum;
        return matchedSpace && matchedCompartment;
      }

      return food.space === space;
    });
  };

  const getFilteredFoodList = (filter: Filter, foodList: Food[]) => {
    if (filter === '전체') return foodList;

    if (filter === '냉동실' || filter === '냉장실' || filter === '실온보관')
      return getMatchedPositionFoods('allFoods', filter);

    if (filter === '없는 식료품') {
      return foodList.filter(({ name }) => !!!findFood(name));
    }

    if (filter === '소비기한 만료')
      return foodList.filter((food) => expired(food.expiredDate));

    if (filter === '소비기한 3일 이내')
      return foodList.filter((food) => leftThreeDays(food.expiredDate));

    if (filter === '소비기한 일주일 이내')
      return foodList.filter((food) => leftWeek(food.expiredDate));

    return foodList.filter((food) => food.category === filter);
  };

  const foodList = routeFavoriteFoods ? favoriteFoods : pantryFoods;

  const changeListByCategoryFilter = (categoryList: Category[]) => {
    const currentFilter = foodCategories.some(
      ({ category }) => filter === category
    );
    return currentFilter
      ? categoryList.filter((category) => category === filter)
      : categoryList;
  };

  const getExistCategoryList = () => {
    const uniqueCategory = foodList
      .map((item) => item.category)
      .filter((value, index, self) => self.indexOf(value) === index);

    return changeListByCategoryFilter(uniqueCategory);
  };

  const getFilteredSortByCategoryList = (category: Category) => {
    const sortByCategory = foodList.filter(
      (food) => food.category === category
    );

    if (filter === '없는 식료품') {
      const allFoods = [...fridgeFoods, ...pantryFoods];
      return sortByCategory.filter(
        (food) => !!!allFoods.find((allFood) => allFood.name === food.name)
      );
    }

    return sortByCategory;
  };

  return {
    allFoods,
    fridgeFoods,
    favoriteFoods,
    pantryFoods,
    allCautionFoods,
    threeLeftDaysFoods,
    expiredFoods,
    getMatchedPositionFoods,
    getFilteredFoodList,
    getExistCategoryList,
    getFilteredSortByCategoryList,
  };
};
