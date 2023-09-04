import { Animated, PanResponder } from 'react-native';
import { Food } from '../../constant/foods';
import { useRef } from 'react';
import { CompartmentNum } from '../../constant/fridgeInfo';
import { useHeaderHeight } from '@react-navigation/elements';
import { DEVICE_HEIGHT, Filter } from '../../util';
import { useDispatch } from 'react-redux';
import { editFood } from '../../redux/slice/allFoodsSlice';
import { CompartmentNumToDrop } from '../../screens/Compartments';
import { TouchableOpacity } from '../../components/common/native-component';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from '../../redux/hook';
import { usePulseAnimation, useShakingAnimation } from '../../hooks';

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
  searchedName: string;
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
  searchedName,
}: Props) {
  const { fridgeInfo } = useSelector((state) => state.fridgeInfo);

  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const topPadding = insets.top;
  const bottomPadding = insets.bottom;
  const startHeight = +(headerHeight + FILTER_HEIGHT).toFixed(0);
  const maxCompartmentNum = fridgeInfo.compartments[food.space];
  const compartmentHeight =
    (DEVICE_HEIGHT -
      (startHeight + GAP * (maxCompartmentNum + 1) + bottomPadding + 13)) /
    maxCompartmentNum;

  const dispatch = useDispatch();
  const { rotate } = useShakingAnimation({ active: moveMode });
  const { opacity, animateOpacity, translateY, bgColor } = usePulseAnimation({
    active: searchedName === food.name,
  });

  const pan = useRef(new Animated.ValueXY()).current;

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
        animateOpacity(0.5);
        setSelectedFood(food);
        setDragPosition({
          x: gestureState.moveX - 50,
          y: gestureState.moveY - 440 + bottomPadding,
        });
      },
      onPanResponderMove: (_, gestureState) => {
        setDragPosition({
          x: gestureState.moveX - 50,
          y: gestureState.moveY - 400 + topPadding + bottomPadding,
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
        animateOpacity(1);
        setMoveMode(false);
      },
    })
  ).current;

  const transformAnimation = {
    transform: [{ rotate }, { translateX: pan.x }, { translateY: pan.y }],
  };

  return (
    <Animated.View
      style={{
        opacity,
        borderRadius: 100,
        backgroundColor: searchedName === food.name ? bgColor : '#fff',
        ...(moveMode
          ? transformAnimation
          : {
              transform: [
                { translateY: searchedName === food.name ? translateY : 0 },
              ],
            }),
      }}
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
        <FoodBox food={food} filter={filter} />
      </TouchableOpacity>
    </Animated.View>
  );
}
