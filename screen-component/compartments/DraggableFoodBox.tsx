import { Animated } from 'react-native';
import { Food } from '../../constant/foodInfo';
import { TouchableOpacity } from '../../components/common/native-component';
import {
  useDragAndDropFood,
  usePulseAnimation,
  useShakingAnimation,
} from '../../hooks';
import { useFindCompartmentNum } from '../../hooks/useFindCompartmentNum';
import { select } from '../../redux/slice/selectedFoodSlice';
import { useDispatch, useSelector } from '../../redux/hook';
import { toggleDragMode } from '../../redux/slice/dragModeSlice';

import FoodBox from './FoodBox';

interface Props {
  food: Food;
  setIsDragging: (isDragging: boolean) => void;
  dragPosition: Animated.ValueXY;
  setModalVisible: (visible: boolean) => void;
  searchedName: string;
}

export const shadowStyle = {
  shadowColor: '#333',
  shadowOffset: { height: 1, width: 0 },
  shadowOpacity: 0.3,
  shadowRadius: 2,
};

export default function DraggableFoodBox({
  food,
  setIsDragging,
  dragPosition,
  setModalVisible,
  searchedName,
}: Props) {
  const { dragMode } = useSelector((state) => state.dragMode);
  const { selectedFood } = useSelector((state) => state.selectedFood);
  const dispatch = useDispatch();

  const {
    opacity,
    translateY,
    bgColor, //
  } = usePulseAnimation({ active: searchedName === food.name });

  const { rotate } = useShakingAnimation({ active: dragMode });

  const { findCompartmentNum } = useFindCompartmentNum({ food });

  const { panResponder } = useDragAndDropFood({
    food,
    setIsDragging,
    dragPosition,
    findCompartmentNum,
  });

  const searchedFoodBox = searchedName === food.name;
  const draggingFoodBox = selectedFood.name === food.name;
  const transformAnimation = dragMode
    ? {
        opacity: draggingFoodBox ? 0.3 : 1,
        transform: [{ rotate }],
      }
    : {
        opacity,
        transform: [{ translateY: searchedFoodBox ? translateY : 0 }],
      };

  return (
    <Animated.View
      style={{
        borderRadius: 8,
        backgroundColor: searchedFoodBox ? bgColor : '#fff',
        ...shadowStyle,
        ...transformAnimation,
      }}
      {...(dragMode ? { ...panResponder.panHandlers } : null)}
    >
      <TouchableOpacity
        key={food.id}
        onPress={() => {
          if (dragMode) return dispatch(toggleDragMode(false));
          dispatch(select(food));
          setModalVisible(true);
        }}
        onLongPress={() => {
          dispatch(select(food));
          if (!dragMode) return dispatch(toggleDragMode(true));
        }}
      >
        <FoodBox food={food} />
      </TouchableOpacity>
    </Animated.View>
  );
}
