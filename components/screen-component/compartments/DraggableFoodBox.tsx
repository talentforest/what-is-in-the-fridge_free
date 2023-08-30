import { Animated, Easing, PanResponder } from 'react-native';
import { Food } from '../../../constant/foods';
import { useEffect, useRef } from 'react';
import { CompartmentNum } from '../../../constant/fridgeInfo';
import { useHeaderHeight } from '@react-navigation/elements';
import { Filter } from '../../../util';
import { useDispatch } from 'react-redux';
import { editFood } from '../../../redux/slice/allFoodsSlice';
import { CompartmentNumToDrop } from '../../../screens/Compartments';

import FoodBox from './FoodBox';

interface Props {
  food: Food;
  filter: Filter;
  moveMode: boolean;
  setCompartmentNumToDrop: (numToDrop: CompartmentNumToDrop) => void;
  compartmentHeight: number;
  setSelectedFood: (food: Food) => void;
  setIsDragging: (isDragging: boolean) => void;
  setDragPosition: ({ x, y }: { x: number; y: number }) => void;
}

export default function DraggableFoodBox({
  food,
  filter,
  moveMode,
  setCompartmentNumToDrop,
  compartmentHeight,
  setSelectedFood,
  setIsDragging,
  setDragPosition,
}: Props) {
  const dispatch = useDispatch();

  const rotate = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  const headerHeight = useHeaderHeight();
  const startHeight = +(headerHeight + 7).toFixed(0);

  const animatedRotate = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(rotate, {
          toValue: -1,
          duration: 100,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(rotate, {
          toValue: 0,
          duration: 100,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(rotate, {
          toValue: 1,
          duration: 100,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(rotate, {
          toValue: 0,
          duration: 100,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const rotateData = rotate.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ['-3deg', '0deg', '3deg'],
  });

  const animatedOpacity = (opacityValue: number) => {
    Animated.timing(opacity, {
      duration: 200,
      toValue: opacityValue,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (moveMode) {
      animatedRotate();
    }
  }, [moveMode]);

  const getTop = (compartmentNum: CompartmentNum) => {
    const calNum = +compartmentNum.slice(0, 1) - 1;
    return startHeight + compartmentHeight * calNum * calNum;
  };

  const getBottom = (compartmentNum: CompartmentNum) => {
    const calNum = +compartmentNum.slice(0, 1) - 1;
    return startHeight + compartmentHeight * (calNum + 1) + 4 * calNum;
  };

  const getCompartmentNum = (moveY: number) => {
    if (getTop('1번') <= moveY && moveY <= getBottom('1번')) return '1번';

    if (getTop('2번') <= moveY && moveY <= getBottom('2번')) return '2번';

    if (getTop('3번') <= moveY && moveY <= getBottom('3번')) return '3번';

    if (getTop('4번') <= moveY && moveY <= getBottom('4번')) return '4번';

    if (getTop('5번') <= moveY && moveY <= getBottom('5번')) return '5번';
    return food.compartmentNum;
  };

  const pan = useRef(new Animated.ValueXY()).current;
  const animatedReturnPosition = () => {
    Animated.spring(pan, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: true,
    }).start();
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
        } else {
          animatedReturnPosition();
        }

        setCompartmentNumToDrop('동일칸');
        setIsDragging(false);
        animatedOpacity(1);
      },
    })
  ).current;

  return (
    <Animated.View
      style={{
        transform: [
          { rotate: rotateData },
          { translateX: pan.x },
          { translateY: pan.y },
        ],
        opacity,
        borderRadius: 50,
      }}
      {...panResponder.panHandlers}
    >
      <FoodBox food={food} moveMode={moveMode} filter={filter} />
    </Animated.View>
  );
}
