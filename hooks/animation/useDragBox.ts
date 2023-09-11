import { PanResponder } from 'react-native';
import { useRef } from 'react';
import { Animated } from 'react-native';
import { DEVICE_WIDTH } from '../../util';

const DRAG_DISTANCE = -50;

export const useDragBox = () => {
  const translateX = useRef(new Animated.Value(0)).current;

  const animateTranslateX = (toValue: number) => {
    Animated.timing(translateX, {
      toValue,
      duration: 400,
      useNativeDriver: false,
    }).start();
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, { dx, dy }) => {
        return dx > 2 || dx < -2 || dy > 2 || dy < -2;
      },
      onMoveShouldSetPanResponderCapture: (_, { dx, dy }) => {
        return dx > 2 || dx < -2 || dy > 2 || dy < -2;
      },
      onPanResponderGrant: (_, { dx }) => {
        if (dx > 0) return;
        translateX.setValue(dx);
      },
      onPanResponderMove: (_, { dx }) => {
        if (dx > 0) return;
        translateX.setValue(dx);
      },
      onPanResponderRelease: (_, { dx, moveX }) => {
        if (dx > 0) return;
        const isPositionMax = DEVICE_WIDTH - 32 - 50;
        console.log(
          'dx:',
          dx,
          'DRAG_DISTANCE:',
          DRAG_DISTANCE,
          'moveX:',
          moveX,
          'isPositionMax:',
          isPositionMax
        );
        if ((0 > dx && dx > -DRAG_DISTANCE) || (0 < dx && dx < DRAG_DISTANCE)) {
          return animateTranslateX(0);
        }
        if (dx < DRAG_DISTANCE && moveX < isPositionMax) {
          return translateX.setValue(-50);
        }
        if (dx > DRAG_DISTANCE && moveX > isPositionMax) {
          return animateTranslateX(0);
        }
      },
    })
  ).current;

  return { panResponder, translateX };
};
