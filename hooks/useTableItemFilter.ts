import { useState } from 'react';
import useFavoriteFoods from './useFavoriteFoods';
import useExpiredFoods from './useExpiredFoods';

export type FavoriteFoodsFilter = '전체' | '냉장고에 있음' | '냉장고에 없음';
export type ExpiredFoodsFilter = '전체' | '냉장실' | '냉동실';
export type AllFilter = FavoriteFoodsFilter | ExpiredFoodsFilter;

export default function useTableItemFilter() {
  const [currentFilter, setCurrentFilter] = useState<AllFilter>('전체');

  const { allExpiredFoods, filterExpiredFoods } = useExpiredFoods();
  const { nonExistFavoriteFoods, existFavoriteFoods } = useFavoriteFoods();

  const allExpiredFoodsFilters: ExpiredFoodsFilter[] = [
    '전체',
    '냉장실',
    '냉동실',
  ];
  const allFavoriteFoodsFilters: FavoriteFoodsFilter[] = [
    '전체',
    '냉장고에 없음',
    '냉장고에 있음',
  ];

  const getExpiredTableList = (currentFilter: ExpiredFoodsFilter) => {
    if (currentFilter === '전체') return allExpiredFoods;
    return filterExpiredFoods(currentFilter);
  };

  const getFavoriteTableList = (filter: FavoriteFoodsFilter) => {
    if (filter === '냉장고에 있음') return [...existFavoriteFoods];
    if (filter === '냉장고에 없음') return [...nonExistFavoriteFoods];
    return [...nonExistFavoriteFoods, ...existFavoriteFoods];
  };

  const expiredTableList = getExpiredTableList(
    currentFilter as ExpiredFoodsFilter
  );

  const favoriteTableList = getFavoriteTableList(
    currentFilter as FavoriteFoodsFilter
  );

  return {
    currentFilter,
    setCurrentFilter,
    allFavoriteFoodsFilters,
    favoriteTableList,
    allExpiredFoodsFilters,
    expiredTableList,
  };
}
