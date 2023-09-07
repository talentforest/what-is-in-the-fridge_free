import { useNavigation } from '@react-navigation/native';
import { useDispatch } from '../redux/hook';
import { NavigateProp } from '../navigation/Navigation';
import { Space } from '../constant/fridgeInfo';
import { removeFood } from '../redux/slice/allFoodsSlice';

interface Props {
  space: Space;
  setModalVisible: (visible: boolean) => void;
}

export const useDeleteFood = ({ space, setModalVisible }: Props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigateProp>();

  const deleteFood = (foodId: string) => {
    dispatch(removeFood({ id: foodId }));
    navigation.navigate('Compartments', { space });
    setModalVisible(false);
  };

  return {
    deleteFood,
  };
};
