import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

interface Props {
  initialValue: number;
  toValue: number;
  active: boolean;
}

export const useSlideAnimation = ({ initialValue, toValue, active }: Props) => {
  const height = useRef(new Animated.Value(initialValue)).current;

  const animatedSlide = (toValue: number) => {
    Animated.timing(height, {
      toValue,
      useNativeDriver: false,
      duration: 400,
    }).start();
  };

  const interpolatedOpacity = height.interpolate({
    inputRange: [0, initialValue],
    outputRange: [0, 1],
  });

  useEffect(() => {
    if (active) {
      animatedSlide(toValue);
    } else {
      animatedSlide(0);
    }
  }, [active]);

  return {
    height,
    interpolatedOpacity,
  };
};
