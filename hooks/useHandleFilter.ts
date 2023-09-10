import { foodCategories } from '../constant/foodCategories';
import { Food, PantryFood } from '../constant/foodInfo';
import { useDispatch, useSelector } from '../redux/hook';
import { changeFilter } from '../redux/slice/filterSlice';
import { Filter } from '../util';

export const useHandleFilter = () => {
  const { currentFilter } = useSelector((state) => state.currentFilter);

  const dispatch = useDispatch();

  const initializeFilter = () => {
    if (currentFilter !== '전체') {
      dispatch(changeFilter('전체'));
    }
  };

  const onFilterPress = (
    filter: Filter,
    setCheckedList?: (foods: (Food | PantryFood)[]) => void
  ) => {
    dispatch(changeFilter(filter));
    if (setCheckedList) return setCheckedList([]);
  };

  const isCategoryFilter = foodCategories?.find(
    ({ category }) => category === currentFilter
  );

  return {
    currentFilter,
    initializeFilter,
    onFilterPress,
    isCategoryFilter,
  };
};
