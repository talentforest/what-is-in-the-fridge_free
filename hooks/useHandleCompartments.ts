import { Alert } from 'react-native';
import { useDispatch, useSelector } from '../redux/hook';
import useGetFoodList from './useGetFoodList';
import {
  minusCompartment,
  plusCompartment,
} from '../redux/slice/fridgeInfoSlice';
import { Space } from '../constant/fridgeInfo';

interface Props {
  name: Space;
}

export default function useHandleCompartments({ name }: Props) {
  const { fridgeInfo } = useSelector((state) => state.fridgeInfo);
  const { getFoodList } = useGetFoodList();
  const dispatch = useDispatch();

  const MAX_COMPARTMENTS_NUM = name.includes('냉동실') ? 3 : 5;

  const existFoodInLastCompartment = getFoodList(name).filter((food) => {
    return +food.compartmentNum.slice(0, 1) === fridgeInfo.compartments[name];
  });

  const onMinusPress = () => {
    if (fridgeInfo.compartments[name] <= 1) return;
    if (existFoodInLastCompartment.length !== 0)
      return Alert.alert(
        '식료품 존재 안내',
        `${fridgeInfo.compartments[name]}번 칸에 식료품이 있어 삭제할 수 없어요.`
      );
    dispatch(minusCompartment(name));
  };

  const onPlusPress = () => {
    if (fridgeInfo.compartments[name] >= MAX_COMPARTMENTS_NUM) return;
    dispatch(plusCompartment(name));
  };

  return {
    onMinusPress,
    onPlusPress,
  };
}
