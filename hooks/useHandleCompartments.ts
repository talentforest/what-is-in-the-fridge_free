import { useDispatch, useSelector } from '../redux/hook';
import {
  minusCompartment,
  plusCompartment,
} from '../redux/slice/fridgeInfoSlice';
import { CompartmentNum, Space } from '../constant/fridgeInfo';
import { alertPhraseDeleteCompartment } from '../constant/alertPhrase';
import { setAlertInfo, toggleAlertModal } from '../redux/slice/alertModalSlice';

interface Props {
  space: Space;
}

export const useHandleCompartments = ({ space }: Props) => {
  const { fridgeInfo } = useSelector((state) => state.fridgeInfo);
  const { fridgeFoods } = useSelector((state) => state.fridgeFoods);
  const dispatch = useDispatch();

  const MAX_COMPARTMENTS_NUM = space.includes('냉동실') ? 3 : 5;

  const lastCompartment = fridgeInfo.compartments[space];
  const existFoodInLastCompartment = fridgeFoods
    .filter((food) => food.space === space)
    .filter((food) => {
      if (food.compartmentNum)
        return +food.compartmentNum.slice(0, 1) === lastCompartment;
    });

  const onMinusPress = () => {
    if (fridgeInfo.compartments[space] <= 1) return;
    const guide = alertPhraseDeleteCompartment(
      `${fridgeInfo.compartments[space]}번` as CompartmentNum
    );
    const { title, msg } = guide;

    if (existFoodInLastCompartment.length !== 0) {
      dispatch(toggleAlertModal(true));
      dispatch(setAlertInfo({ title, msg, btns: ['확인'] }));
      return;
    }

    dispatch(minusCompartment(space));
  };

  const onPlusPress = () => {
    if (fridgeInfo.compartments[space] >= MAX_COMPARTMENTS_NUM) return;
    dispatch(plusCompartment(space));
  };

  const onConfirmPress = () => {
    dispatch(toggleAlertModal(false));
  };

  return {
    onMinusPress,
    onPlusPress,
    onConfirmPress,
  };
};
