import { useRoute } from '@react-navigation/native';
import { foodCategories } from '../constant/foodCategories';
import { useDispatch, useSelector } from '../redux/hook';
import { changeFilter, changePantryFilter } from '../redux/slice/filterSlice';
import { Filter, scrollTo, scrollToEnd } from '../util';

export const useHandleFilter = (scrollViewRef?: any) => {
  const { filter, pantryFilter } = useSelector((state) => state.filter);

  const route = useRoute();
  const routePantryFoods = route.name === 'PantryFoods';
  const dispatch = useDispatch();

  const currentFilter = routePantryFoods ? pantryFilter : filter;

  const changeFilterState = (filterName: Filter) => {
    routePantryFoods
      ? dispatch(changePantryFilter(filterName))
      : dispatch(changeFilter(filterName));
  };

  const findCategoryFilter = (filterName: Filter) => {
    return foodCategories?.find(({ category }) => category === filterName);
  };

  const filterState =
    findCategoryFilter(currentFilter)?.category || '신선식품류';

  const initializeFilter = () => {
    if (filter !== '전체') {
      dispatch(changeFilter('전체'));
    }
  };

  const scrollToFilter = (index: number) => {
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

    return index === 7
      ? scrollToEnd(scrollViewRef)
      : scrollTo(scrollViewRef, x, y);
  };

  return {
    currentFilter,
    initializeFilter,
    changeFilterState,
    findCategoryFilter,
    filterState,
    scrollToFilter,
  };
};
