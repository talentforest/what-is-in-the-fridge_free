import { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import { useDispatch } from '../../redux/hook';
import { toggleDragMode } from '../../redux/slice/dragModeSlice';

interface Props {
  active: boolean;
  isDragging: boolean;
}

export const useShakingAnimation = ({ active, isDragging }: Props) => {
  const rotateValue = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();

  const rotate = rotateValue.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ['-2.5deg', '0deg', '2.5deg'],
  });

  const animateRotate = (toValue: number) => {
    return Animated.timing(rotateValue, {
      toValue,
      duration: 80,
      easing: Easing.linear,
      useNativeDriver: true,
    });
  };

  const animatedRotate = () => {
    Animated.loop(
      Animated.sequence([
        animateRotate(-1),
        animateRotate(0),
        animateRotate(1),
        animateRotate(0),
      ])
    ).start();
  };

  useEffect(() => {
    if (active) {
      animatedRotate();
    }
  }, [active]);

  return {
    rotate,
  };
};
