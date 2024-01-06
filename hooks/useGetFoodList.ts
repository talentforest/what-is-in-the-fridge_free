import { Category, foodCategories } from '../constant/foodCategories';
import { Food } from '../constant/foodInfo';
import { CompartmentNum, Space, SpaceType } from '../constant/fridgeInfo';
import { useSelector } from '../redux/hook';
import { Filter } from '../util';
import { useFindFood } from './useFindFood';
import { useRouteName } from './useRouteName';

export const useGetFoodList = () => {
  const { fridgeFoods } = useSelector((state) => state.fridgeFoods);
  const { pantryFoods } = useSelector((state) => state.pantryFoods);
  const { favoriteFoods } = useSelector((state) => state.favoriteFoods);
  const { filter } = useSelector((state) => state.filter);

  const { findFood, isExpiredSoonFood, isExpiredFood } = useFindFood();

  const { routeFavoriteFoods } = useRouteName();

  const allFoods = [...fridgeFoods, ...pantryFoods];

  const expiredSoonFoods = allFoods.filter((food) =>
    isExpiredSoonFood(food.expiredDate)
  );

  const expiredFoods = allFoods.filter((food) =>
    isExpiredFood(food.expiredDate)
  );

  const cautionFoods = [...expiredFoods, ...expiredSoonFoods];

  const getMatchedPositionFoods = (
    type: 'allFoods' | 'cautionFoods',
    space: SpaceType | Space,
    compartmentNum?: CompartmentNum
  ) => {
    const foodList = type === 'cautionFoods' ? cautionFoods : allFoods;

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

    if (filter === '소비기한 임박')
      return foodList.filter((food) => isExpiredSoonFood(food.expiredDate));

    if (filter === '소비기한 만료')
      return foodList.filter((food) => isExpiredFood(food.expiredDate));

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
    expiredSoonFoods,
    expiredFoods,
    cautionFoods,
    getMatchedPositionFoods,
    getFilteredFoodList,
    getExistCategoryList,
    getFilteredSortByCategoryList,
  };
};
