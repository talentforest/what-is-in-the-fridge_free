import { useDispatch } from '../redux/hook';
import { Space } from '../constant/fridgeInfo';
import { removeFridgeFood } from '../redux/slice/food-list/fridgeFoodsSlice';
import { removePantryFood } from '../redux/slice/food-list/pantryFoodsSlice';
import { showOpenFoodDetailModal } from '../redux/slice/modalVisibleSlice';

export const useDeleteFood = (space: Space) => {
  const dispatch = useDispatch();

  const deleteFood = (id: string) => {
    dispatch(space === '팬트리' ? removePantryFood(id) : removeFridgeFood(id));
    dispatch(showOpenFoodDetailModal(false));
  };

  return {
    deleteFood,
  };
};
