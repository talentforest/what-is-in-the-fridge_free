import { useRef } from 'react';
import { PanResponder } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch } from '../../redux/hook';
import { addFood, removeFood } from '../../redux/slice/allFoodsSlice';
import { Food } from '../../constant/foods';
import { CompartmentNum } from '../../constant/fridgeInfo';
import { select } from '../../redux/slice/selectedFoodSlice';
import { toggleDragMode } from '../../redux/slice/dragModeSlice';
import { changeCompartmentNum } from '../../redux/slice/compartmentNumToDropSlice';

interface Props {
  food: Food;
  setIsDragging: (isDraggin: boolean) => void;
  setDragPosition: ({ x, y }: { x: number; y: number }) => void;
  findCompartmentNum: (moveY: number) => CompartmentNum;
}

export const useDragFood = ({
  food,
  setIsDragging,
  setDragPosition,
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
        setDragPosition({
          x: gestureState.moveX - 50,
          y: gestureState.moveY - 400 - insets.bottom - insets.top,
        });
      },
      onPanResponderMove: (_, gestureState) => {
        setDragPosition({
          x: gestureState.moveX - 50,
          y: gestureState.moveY - 400 - insets.bottom - insets.top,
        });
        const compartmentNumToDrop = findCompartmentNum(gestureState.moveY);
        const moveCompartment = compartmentNumToDrop !== food.compartmentNum;
        dispatch(
          changeCompartmentNum(
            moveCompartment ? compartmentNumToDrop : '동일칸'
          )
        );
      },
      onPanResponderRelease: (_, { moveY }) => {
        const compartmentNumToDrop = findCompartmentNum(moveY);
        const moveCompartment = compartmentNumToDrop !== food.compartmentNum;

        if (moveCompartment) {
          dispatch(removeFood({ id: food.id }));
          dispatch(addFood({ ...food, compartmentNum: compartmentNumToDrop }));
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
