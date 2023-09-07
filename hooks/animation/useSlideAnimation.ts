import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

interface Props {
  initialValue: number;
  toValue: number;
  active: boolean;
  afterAnimation?: () => void;
}

export const useSlideAnimation = ({
  initialValue,
  toValue,
  active,
  afterAnimation,
}: Props) => {
  const height = useRef(new Animated.Value(initialValue)).current;

  const animatedSlide = (toValue: number) => {
    Animated.timing(height, {
      toValue,
      useNativeDriver: false,
      duration: 300,
    }).start(() => {
      if (active && afterAnimation) {
        afterAnimation();
      }
    });
  };

  useEffect(() => {
    if (active) {
      animatedSlide(toValue);
    } else {
      animatedSlide(initialValue);
    }
  }, [active]);

  const interpolatedOpacity = height.interpolate({
    inputRange: [0, initialValue],
    outputRange: [0, 1],
  });

  return {
    height,
    animatedSlide,
    interpolatedOpacity,
  };
};
