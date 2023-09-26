import { Animated } from 'react-native';
import { Food } from '../../constant/foodInfo';
import { TouchableOpacity } from '../../components/common/native-component';
import { useDragAndDropFood, useShakingAnimation } from '../../hooks';
import { useFindCompartmentNum } from '../../hooks/useFindCompartmentNum';
import { select } from '../../redux/slice/selectedFoodSlice';
import { useDispatch, useSelector } from '../../redux/hook';
import { toggleDragMode } from '../../redux/slice/dragModeSlice';
import FoodBox from '../../components/common/FoodBox';

interface Props {
  food: Food;
  setIsDragging: (isDragging: boolean) => void;
  dragPosition: Animated.ValueXY;
  setModalVisible: (visible: boolean) => void;
}

export default function DraggableFoodBox({
  food,
  setIsDragging,
  dragPosition,
  setModalVisible,
}: Props) {
  const { dragMode } = useSelector((state) => state.dragMode);
  const { selectedFood } = useSelector((state) => state.selectedFood);

  const dispatch = useDispatch();

  const { rotate } = useShakingAnimation({ active: dragMode });

  const { findCompartmentNum } = useFindCompartmentNum({ food });

  const { panResponder } = useDragAndDropFood({
    food,
    setIsDragging,
    dragPosition,
    findCompartmentNum,
  });

  const transformAnimation = {
    backgroundColor: '#fff',
    opacity: selectedFood.name === food.name ? 0.3 : 1,
    transform: [{ rotate }],
  };

  return (
    <Animated.View
      style={dragMode ? { ...transformAnimation } : null}
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
