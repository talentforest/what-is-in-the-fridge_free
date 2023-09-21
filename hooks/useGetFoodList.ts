import { useRoute } from '@react-navigation/native';
import { Category, foodCategories } from '../constant/foodCategories';
import { Food } from '../constant/foodInfo';
import { CompartmentNum, Space, SpaceType } from '../constant/fridgeInfo';
import { useSelector } from '../redux/hook';
import { Filter, expired, getLeftDays, leftThreeDays } from '../util';

export const useGetFoodList = () => {
  const { fridgeFoods } = useSelector((state) => state.fridgeFoods);
  const { favoriteFoods } = useSelector((state) => state.favoriteFoods);
  const { pantryFoods } = useSelector((state) => state.pantryFoods);
  const { currentFilter } = useSelector((state) => state.currentFilter);

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
      (food) => getLeftDays(food.expiredDate) < 4
    );
    const expiredPantryFoods = pantryFoods.filter(
      (food) => getLeftDays(food.expiredDate) < 4
    );
    if (type === 'fridge') return orderExpirationDate(expiredFridgeFoods);
    if (type === 'pantry') return orderExpirationDate(expiredPantryFoods);
    return orderExpirationDate([...expiredFridgeFoods, ...expiredPantryFoods]);
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
    type: 'fridgeFoods' | 'expiredFoods',
    space: SpaceType | Space,
    compartmentNum?: CompartmentNum
  ) => {
    const foodList = type === 'fridgeFoods' ? fridgeFoods : allExpiredFoods();

    const filteredFoods = foodList.filter((food) =>
      matchFoodSpace(food as Food, space, compartmentNum)
    );
    return filteredFoods;
  };

  // Table 필터의 개수를 나타내주는 함수이기도 하다.
  const getFilteredFoodList = (filter: Filter, foodList: Food[]) => {
    if (filter === '전체') return orderExpirationDate(foodList);

    if (filter === '냉동실' || filter === '냉장실' || filter === '팬트리')
      return getFoodList('expiredFoods', filter);

    if (filter === '없는 식료품') {
      const allFoods = [...fridgeFoods, ...pantryFoods];
      return foodList.filter(
        (food) => !!!allFoods.find((allFood) => allFood.name === food.name)
      );
    }

    if (filter === '자주 먹는 식료품') {
      return foodList.filter((food) =>
        favoriteFoods.find((favFood) => food.name === favFood.name)
      );
    }

    if (filter === '유통기한 만료') {
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

  const route = useRoute();
  const routeFavoriteFoods = route.name === 'FavoriteFoods';
  const foodList = routeFavoriteFoods ? favoriteFoods : pantryFoods;

  const changeListByCategoryFilter = (categoryList: Category[]) => {
    const filter = foodCategories.some(
      ({ category }) => currentFilter === category
    );
    return filter
      ? categoryList.filter((category) => category === currentFilter)
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

    if (currentFilter === '없는 식료품') {
      const allFoods = [...fridgeFoods, ...pantryFoods];
      return sortByCategory.filter(
        (food) => !!!allFoods.find((allFood) => allFood.name === food.name)
      );
    }

    if (currentFilter === '자주 먹는 식료품') {
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
