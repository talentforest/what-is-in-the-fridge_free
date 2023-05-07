import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from '../redux/hook';
import { changeFreezer, changeFridge } from '../redux/slice/foodsListSlice';
import { NavigateProp } from '../navigation/Navigation';
import { Space } from '../constant/fridge';

interface Props {
  space: Space;
  setModalVisible: (visible: boolean) => void;
}

export default function useDeleteFood({ space, setModalVisible }: Props) {
  const { fridgeFoods, freezerFoods } = useSelector((state) => state.foodsList);
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigateProp>();

  const deleteFood = (foodId: string) => {
    if (space.includes('냉장')) {
      const filteredFoods = fridgeFoods.filter((food) => food.id !== foodId);
      dispatch(changeFridge(filteredFoods));
    }
    if (space.includes('냉동')) {
      const filteredFoods = freezerFoods.filter((food) => food.id !== foodId);
      dispatch(changeFreezer(filteredFoods));
    }
    navigation.navigate('Compartments', { space });
    setModalVisible(false);
  };

  return {
    deleteFood,
  };
}
