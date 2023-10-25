import { useRoute } from '@react-navigation/native';
import { Category, foodCategories } from '../constant/foodCategories';
import { Food } from '../constant/foodInfo';
import { CompartmentNum, Space, SpaceType } from '../constant/fridgeInfo';
import { useSelector } from '../redux/hook';
import { Filter, expired, getLeftDays, leftThreeDays, leftWeek } from '../util';

export const useGetFoodList = () => {
  const { fridgeFoods } = useSelector((state) => state.fridgeFoods);
  const { favoriteFoods } = useSelector((state) => state.favoriteFoods);
  const { pantryFoods } = useSelector((state) => state.pantryFoods);
  const { filter } = useSelector((state) => state.filter);

  const allFoods = [...fridgeFoods, ...pantryFoods];

  const orderExpirationDate = (list: Food[]) => {
    const copiedList = list ? [...list] : [];

    const sortedList = copiedList.sort(
      (food1, food2) =>
        new Date(food1.expiredDate).getTime() -
        new Date(food2.expiredDate).getTime()
    );
    return sortedList || [];
  };

  const allExpiredFoods = (type?: 'fridge' | 'pantry') => {
    const expiredFridgeFoods = fridgeFoods.filter(
      (food) => getLeftDays(food.expiredDate) < 8
    );
    const expiredPantryFoods = pantryFoods.filter(
      (food) => getLeftDays(food.expiredDate) < 8
    );
    if (type === 'fridge') return orderExpirationDate(expiredFridgeFoods);
    if (type === 'pantry') return orderExpirationDate(expiredPantryFoods);
    return orderExpirationDate([...expiredFridgeFoods, ...expiredPantryFoods]);
  };

  const matchSpaceFoods = (
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
    const foodList = type === 'fridgeFoods' ? fridgeFoods : allExpiredFoods();

    return foodList.filter((food) =>
      matchSpaceFoods(food, space, compartmentNum)
    );
  };

  const getFilteredFoodList = (filter: Filter, foodList: Food[]) => {
    if (filter === '전체') return foodList;

    if (filter === '냉동실' || filter === '냉장실' || filter === '팬트리')
      return getFoodList('expiredFoods', filter);

    if (filter === '없는 식료품') {
      return foodList.filter(
        (food) => !!!allFoods.find((allFood) => allFood.name === food.name)
      );
    }

    if (filter === '자주 먹는 식료품')
      return foodList.filter((food) =>
        favoriteFoods.find((favFood) => food.name === favFood.name)
      );

    if (filter === '소비기한 만료')
      return foodList.filter((food) => expired(food.expiredDate));

    if (filter === '소비기한 3일 이내')
      return foodList.filter((food) => leftThreeDays(food.expiredDate));

    if (filter === '소비기한 일주일 이내')
      return foodList.filter((food) => leftWeek(food.expiredDate));

    return foodList.filter((food) => food.category === filter);
  };

  const route = useRoute();
  const routeFavoriteFoods = route.name === 'FavoriteFoods';
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

    if (filter === '자주 먹는 식료품') {
      return sortByCategory.filter((food) =>
        favoriteFoods.find((favFood) => food.name === favFood.name)
      );
    }

    return sortByCategory;
  };

  return {
    fridgeFoods,
    favoriteFoods,
    pantryFoods,
    allExpiredFoods,
    getFoodList,
    getFilteredFoodList,
    getExistCategoryList,
    getFilteredSortByCategoryList,
    orderExpirationDate,
  };
};
