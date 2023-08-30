import { useState } from 'react';
import { Filter } from '../util/filters';
import { Food } from '../constant/foods';

import useFavoriteFoods from './useFavoriteFoods';
import useExpiredFoods from './useExpiredFoods';

export default function useTableItemFilter() {
  const [currentFilter, setCurrentFilter] = useState<Filter>('전체');

  const changeFilter = (currentFilter: Filter) => {
    setCurrentFilter(currentFilter);
  };

  const {
    allExpiredFoods,
    filterExpiredFoodsBySpace,
    checkExpired,
    checkLeftThreeDays,
  } = useExpiredFoods();

  const { favoriteFoods, nonExistFavoriteFoods, existFavoriteFoods } =
    useFavoriteFoods();

  const getExpiredTableList = (currentFilter: Filter, list?: Food[]) => {
    if (currentFilter === '냉동실' || currentFilter === '냉장실')
      return filterExpiredFoodsBySpace(currentFilter);

    const expiredList = list || allExpiredFoods;

    if (currentFilter === '유통기한 지남')
      return expiredList.filter((food) => checkExpired(food.expiredDate));

    if (currentFilter === '유통기한 3일 이내')
      return expiredList.filter((food) => checkLeftThreeDays(food.expiredDate));

    return expiredList;
  };

  const getFavoriteTableList = (currentFilter: Filter) => {
    if (currentFilter === '냉장고에 있음') return existFavoriteFoods;
    if (currentFilter === '냉장고에 없음') return nonExistFavoriteFoods;
    if (currentFilter === '전체')
      return [...nonExistFavoriteFoods, ...existFavoriteFoods];

    return favoriteFoods.filter((food) => food.category === currentFilter);
  };

  return {
    currentFilter,
    changeFilter,
    getExpiredTableList,
    getFavoriteTableList,
  };
}
