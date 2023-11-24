import { useDispatch, useSelector } from '../redux/hook';
import {
  minusCompartment,
  plusCompartment,
} from '../redux/slice/fridgeInfoSlice';
import { CompartmentNum, Space } from '../constant/fridgeInfo';
import { useHandleAlert } from './useHandleAlert';

interface Props {
  space: Space;
}

export const useHandleCompartments = ({ space }: Props) => {
  const { fridgeInfo } = useSelector((state) => state.fridgeInfo);
  const { fridgeFoods } = useSelector((state) => state.fridgeFoods);

  const dispatch = useDispatch();

  const { alertDeleteCompartment, setAlert } = useHandleAlert();

  const MAX_COMPARTMENTS_NUM = space.includes('냉동실') ? 3 : 5;

  const lastCompartment = fridgeInfo.compartments[space];
  const existFoodInLastCompartment = fridgeFoods
    .filter((food) => food.space === space)
    .filter((food) => {
      if (food.compartmentNum)
        return +food.compartmentNum.slice(0, 1) === lastCompartment;
    });

  const onMinusPress = () => {
    const num = fridgeInfo.compartments[space];
    if (num <= 1) return;

    const compartmentNum = `${num}번` as CompartmentNum;

    if (existFoodInLastCompartment.length !== 0) {
      const guide = alertDeleteCompartment(compartmentNum);
      setAlert(guide);
      return;
    }

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
