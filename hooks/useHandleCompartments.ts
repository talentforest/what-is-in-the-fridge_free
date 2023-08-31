import { Alert } from 'react-native';
import { useDispatch, useSelector } from '../redux/hook';
import {
  minusCompartment,
  plusCompartment,
} from '../redux/slice/fridgeInfoSlice';
import { Space } from '../constant/fridgeInfo';

interface Props {
  space: Space;
}

export const useHandleCompartments = ({ space }: Props) => {
  const { fridgeInfo } = useSelector((state) => state.fridgeInfo);
  const { allFoods } = useSelector((state) => state.allFoods);
  const dispatch = useDispatch();

  const MAX_COMPARTMENTS_NUM = space.includes('냉동실') ? 3 : 5;

  const lastCompartment = fridgeInfo.compartments[space];
  const existFoodInLastCompartment = allFoods
    .filter((food) => food.space === space)
    .filter((food) => +food.compartmentNum.slice(0, 1) === lastCompartment);

  const onMinusPress = () => {
    if (fridgeInfo.compartments[space] <= 1) return;
    if (existFoodInLastCompartment.length !== 0)
      return Alert.alert(
        '식료품 존재 안내',
        `${fridgeInfo.compartments[space]}번 칸에 식료품이 있어 삭제할 수 없어요.`
      );
    dispatch(minusCompartment(space));
  };

  const onPlusPress = () => {
    if (fridgeInfo.compartments[space] >= MAX_COMPARTMENTS_NUM) return;
    dispatch(plusCompartment(space));
  };

  return {
    onMinusPress,
    onPlusPress,
  };
};
