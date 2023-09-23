import { useRoute } from '@react-navigation/native';
import { foodCategories } from '../constant/foodCategories';
import { Food } from '../constant/foodInfo';
import { useDispatch, useSelector } from '../redux/hook';
import { changeFilter, changePantryFilter } from '../redux/slice/filterSlice';
import { Filter } from '../util';

export const useHandleFilter = () => {
  const { filter, pantryFilter } = useSelector((state) => state.filter);

  const route = useRoute();
  const routePantryFoods = route.name === 'PantryFoods';
  const dispatch = useDispatch();

  const currentFilter = routePantryFoods ? pantryFilter : filter;

  const onFilterPress = (
    filterName: Filter,
    setCheckedList?: (foods: Food[]) => void
  ) => {
    routePantryFoods
      ? dispatch(changePantryFilter(filterName))
      : dispatch(changeFilter(filterName));

    if (setCheckedList) return setCheckedList([]);
  };

  const findCategoryFilter = (filterName: Filter) => {
    return foodCategories?.find(({ category }) => category === filterName);
  };

  const initializeFilter = () => {
    if (filter !== '전체') {
      dispatch(changeFilter('전체'));
    }
  };

  return {
    currentFilter,
    initializeFilter,
    onFilterPress,
    findCategoryFilter,
  };
};
