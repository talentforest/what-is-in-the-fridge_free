import { useRef } from 'react';
import { PanResponder } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch } from '../../redux/hook';
import {
  addFridgeFood,
  removeFridgeFood,
} from '../../redux/slice/fridgeFoodsSlice';
import { Food } from '../../constant/foodInfo';
import { CompartmentNum } from '../../constant/fridgeInfo';
import { select } from '../../redux/slice/selectedFoodSlice';
import { toggleDragMode } from '../../redux/slice/dragModeSlice';
import { changeCompartmentNum } from '../../redux/slice/compartmentNumToDropSlice';
import { Animated } from 'react-native';

interface Props {
  food: Food;
  setIsDragging: (isDragging: boolean) => void;
  dragPosition: Animated.ValueXY;
  findCompartmentNum: (moveY: number) => CompartmentNum | null;
}

export const useDragAndDropFood = ({
  food,
  setIsDragging,
  dragPosition,
  findCompartmentNum,
}: Props) => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (_, gestureState) => {
        setIsDragging(true);
        dispatch(select(food));
        dragPosition.setValue({
          x: gestureState.moveX - 50,
          y: gestureState.moveY - 400 - insets.bottom - insets.top,
        });
      },
      onPanResponderMove: (_, gestureState) => {
        dragPosition.setValue({
          x: gestureState.moveX - 50,
          y: gestureState.moveY - 400 - insets.bottom - insets.top,
        });

        const compartmentNumToDrop = findCompartmentNum(gestureState.moveY);
        const moveCompartment = compartmentNumToDrop !== food.compartmentNum;
        if (moveCompartment !== null && compartmentNumToDrop !== null) {
          dispatch(
            changeCompartmentNum(
              moveCompartment ? compartmentNumToDrop : '동일칸'
            )
          );
        }
      },
      onPanResponderRelease: (_, { moveY }) => {
        const compartmentNumToDrop = findCompartmentNum(moveY);
        const moveCompartment = compartmentNumToDrop !== food.compartmentNum;

        if (moveCompartment) {
          dispatch(removeFridgeFood({ id: food.id }));
          dispatch(
            addFridgeFood(
              compartmentNumToDrop !== null
                ? { ...food, compartmentNum: compartmentNumToDrop }
                : food
            )
          );
        }
        dispatch(changeCompartmentNum('동일칸'));
        setIsDragging(false);
        dispatch(toggleDragMode(false));
      },
    })
  ).current;

  return {
    panResponder,
  };
};
