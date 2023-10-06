import { useRoute } from '@react-navigation/native';
import { foodCategories } from '../constant/foodCategories';
import { useDispatch, useSelector } from '../redux/hook';
import { changeFilter, changePantryFilter } from '../redux/slice/filterSlice';
import { Filter } from '../util';

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

  const scrollToFilter = (
    filter: Filter,
    filterLength: number,
    index: number
  ) => {
    const offset = index <= 1 ? 0 : filter.length > 6 ? 90 : 180;
    return index === filterLength - 1
      ? scrollViewRef.current?.scrollToEnd()
      : scrollViewRef.current?.scrollTo({
          x: index * 50 + offset,
          y: 0,
          animated: true,
        });
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
