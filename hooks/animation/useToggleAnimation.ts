import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

interface Props {
  initialValue: number;
  toValue: number;
  active: boolean;
}

export const useToggleAnimation = ({
  initialValue,
  toValue,
  active,
}: Props) => {
  const translateX = useRef(new Animated.Value(initialValue)).current;

  const animatedToggle = (toValue: number) => {
    Animated.spring(translateX, {
      toValue,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (active) {
      animatedToggle(0);
    } else {
      animatedToggle(toValue);
    }
  }, [active]);

  return {
    translateX,
    animatedToggle,
  };
};
