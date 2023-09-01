import { Animated, Dimensions, PanResponder } from 'react-native';
import { Food } from '../../constant/foods';
import { useRef } from 'react';
import { CompartmentNum } from '../../constant/fridgeInfo';
import { useHeaderHeight } from '@react-navigation/elements';
import { Filter } from '../../util';
import { useDispatch } from 'react-redux';
import { editFood } from '../../redux/slice/allFoodsSlice';
import { CompartmentNumToDrop } from '../../screens/Compartments';
import { TouchableOpacity } from '../../components/common/native-component';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from '../../redux/hook';
import { useShakingAnimation } from '../../hooks';

import FoodBox from './FoodBox';

interface Props {
  food: Food;
  filter: Filter;
  moveMode: boolean;
  setCompartmentNumToDrop: (numToDrop: CompartmentNumToDrop) => void;
  setSelectedFood: (food: Food) => void;
  setIsDragging: (isDragging: boolean) => void;
  setDragPosition: ({ x, y }: { x: number; y: number }) => void;
  setMoveMode: (mode: boolean) => void;
  setModalVisible: (visible: boolean) => void;
}

const FILTER_HEIGHT = 48;
const GAP = 10;

export default function DraggableFoodBox({
  food,
  filter,
  moveMode,
  setCompartmentNumToDrop,
  setSelectedFood,
  setIsDragging,
  setDragPosition,
  setMoveMode,
  setModalVisible,
}: Props) {
  const { fridgeInfo } = useSelector((state) => state.fridgeInfo);

  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const bottomPadding = insets.bottom;
  const startHeight = +(headerHeight + FILTER_HEIGHT).toFixed(0);
  const maxCompartmentNum = fridgeInfo.compartments[food.space];
  const compartmentHeight =
    (Dimensions.get('screen').height -
      (startHeight + GAP * (maxCompartmentNum + 1) + bottomPadding + 13)) /
    maxCompartmentNum;

  const dispatch = useDispatch();
  const { rotate } = useShakingAnimation({ active: moveMode });

  const pan = useRef(new Animated.ValueXY()).current;
  const opacity = useRef(new Animated.Value(1)).current;

  const animatedOpacity = (toValue: number) => {
    Animated.timing(opacity, {
      duration: 200,
      toValue,
      useNativeDriver: true,
    }).start();
  };

  const getPositionY = (
    compartmentHeight: number,
    compartmentNum: CompartmentNum,
    moveY: number
  ) => {
    const calNum = +compartmentNum.slice(0, 1);
    const topHeight = startHeight + GAP + compartmentHeight * (calNum - 1);
    const bottomHeight = startHeight + GAP + compartmentHeight * calNum;

    return topHeight <= moveY && moveY <= bottomHeight;
  };

  const getCompartmentNum = (moveY: number) => {
    if (getPositionY(compartmentHeight, '1번', moveY)) return '1번';

    if (getPositionY(compartmentHeight, '2번', moveY)) return '2번';

    if (getPositionY(compartmentHeight, '3번', moveY)) return '3번';

    if (getPositionY(compartmentHeight, '4번', moveY)) return '4번';

    if (getPositionY(compartmentHeight, '5번', moveY)) return '5번';

    return food.compartmentNum;
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (_, gestureState) => {
        setIsDragging(true);
        animatedOpacity(0.5);
        setSelectedFood(food);
        setDragPosition({
          x: gestureState.moveX - 50,
          y: gestureState.moveY - 510,
        });
      },
      onPanResponderMove: (_, gestureState) => {
        setDragPosition({
          x: gestureState.moveX - 50,
          y: gestureState.moveY - 510,
        });
        const compartmentNumToDrop = getCompartmentNum(gestureState.moveY);
        const moveCompartment = compartmentNumToDrop !== food.compartmentNum;
        setCompartmentNumToDrop(
          moveCompartment ? compartmentNumToDrop : '동일칸'
        );
      },
      onPanResponderRelease: (_, { moveY }) => {
        const compartmentNumToDrop = getCompartmentNum(moveY);
        const moveCompartment = compartmentNumToDrop !== food.compartmentNum;
        if (moveCompartment) {
          dispatch(
            editFood({
              foodId: food.id,
              editedFood: { ...food, compartmentNum: compartmentNumToDrop },
            })
          );
        }
        setCompartmentNumToDrop('동일칸');
        setIsDragging(false);
        animatedOpacity(1);
        setMoveMode(false);
      },
    })
  ).current;

  return (
    <Animated.View
      style={
        moveMode
          ? {
              transform: [
                { rotate },
                { translateX: pan.x },
                { translateY: pan.y },
              ],
              opacity,
              borderRadius: 50,
            }
          : null
      }
      {...(moveMode ? { ...panResponder.panHandlers } : null)}
    >
      <TouchableOpacity
        key={food.id}
        onPress={() => {
          setSelectedFood(food);
          setModalVisible(true);
          setMoveMode(false);
        }}
        onLongPress={() => {
          if (!moveMode) return setMoveMode(true);
        }}
      >
        <FoodBox food={food} moveMode={moveMode} filter={filter} />
      </TouchableOpacity>
    </Animated.View>
  );
}
