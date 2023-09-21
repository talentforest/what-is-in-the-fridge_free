import { useDispatch } from '../redux/hook';
import { Space } from '../constant/fridgeInfo';
import { removeFridgeFood } from '../redux/slice/fridgeFoodsSlice';
import { removePantryFood } from '../redux/slice/pantryFoodsSlice';

interface Props {
  space: Space;
  setModalVisible: (visible: boolean) => void;
}

export const useDeleteFood = ({ space, setModalVisible }: Props) => {
  const dispatch = useDispatch();

  const deleteFood = (foodId: string) => {
    dispatch(
      space === '팬트리'
        ? removePantryFood({ id: foodId })
        : removeFridgeFood({ id: foodId })
    );
    setModalVisible(false);
  };

  return {
    deleteFood,
  };
};
