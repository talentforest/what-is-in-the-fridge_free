import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

interface Props {
  initialValue: number;
  active: boolean;
}

export const useOpacityAnimation = ({ initialValue, active }: Props) => {
  const bgOpacity = useRef(new Animated.Value(initialValue)).current;

  useEffect(() => {
    if (active) {
      Animated.timing(bgOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      bgOpacity.setValue(initialValue);
    }
  }, [active]);

  return {
    bgOpacity,
  };
};
