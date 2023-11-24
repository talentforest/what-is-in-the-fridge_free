import { foodCategories } from '../constant/foodCategories';
import { useDispatch, useSelector } from '../redux/hook';
import { changeFilter, changePantryFilter } from '../redux/slice/filterSlice';
import { setCheckedList } from '../redux/slice/food-list/checkListSlice';
import { Filter, scrollTo, scrollToEnd } from '../util';
import { useRouteName } from './useRouteName';

export const useHandleFilter = (scrollViewRef?: any) => {
  const { filter, pantryFilter } = useSelector((state) => state.filter);
  const { favoriteFoods } = useSelector((state) => state.favoriteFoods);
  const { category } = useSelector((state) => state.category);

  const { routePantryFoods } = useRouteName();

  const dispatch = useDispatch();

  const currentFilter = routePantryFoods ? pantryFilter : filter;

  const changeFilterState = (filterName: Filter) => {
    routePantryFoods
      ? dispatch(changePantryFilter(filterName))
      : dispatch(changeFilter(filterName));
  };

  const findCategoryFilter = (filter: Filter) => {
    return foodCategories?.find(({ category }) => category === filter);
  };

  const categoryFilter =
    findCategoryFilter(currentFilter)?.category ||
    favoriteFoods[0]?.category ||
    '신선식품류';

  const initializeFilter = () => {
    if (routePantryFoods) {
      if (pantryFilter !== '전체') {
        dispatch(changePantryFilter('전체'));
      }
      return;
    }
    if (filter !== '전체') {
      dispatch(changeFilter('전체'));
    }
  };

  const scrollToFilter = (index: number | 'end') => {
    const x =
      index === 0
        ? 0
        : index === 1
        ? 30
        : index === 2
        ? 160
        : index === 3
        ? 335
        : index === 4
        ? 500
        : index === 5
        ? 600
        : index === 6
        ? 600
        : 600;

    const y = 0;

    return index === 'end'
      ? scrollToEnd(scrollViewRef)
      : scrollTo(scrollViewRef, x, y);
  };

  const onFilterTagPress = (filter: Filter, index?: number | 'end') => {
    changeFilterState(filter);
    dispatch(setCheckedList([]));
    return scrollToFilter(index);
  };

  const isCategoryFilter = findCategoryFilter(currentFilter)?.category;

  const diffCategory = isCategoryFilter && isCategoryFilter !== category;

  return {
    initializeFilter,
    currentFilter,
    categoryFilter,
    onFilterTagPress,
    findCategoryFilter,
    isCategoryFilter,
    diffCategory,
  };
};
