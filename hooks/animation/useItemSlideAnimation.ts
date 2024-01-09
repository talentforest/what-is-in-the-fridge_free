import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { useDispatch, useSelector } from '../../redux/hook';
import { setAfterAnimation } from '../../redux/slice/afterAnimationSlice';

interface Props {
  initialValue: number;
  toValue: number;
  active: boolean;
}

export const useItemSlideAnimation = ({
  initialValue,
  toValue,
  active,
}: Props) => {
  const { afterAnimation } = useSelector((state) => state.afterAnimation);

  const dispatch = useDispatch();

  const height = useRef(new Animated.Value(initialValue)).current;

  const animatedSlide = (toValue: number) => {
    Animated.timing(height, {
      toValue,
      useNativeDriver: false,
      duration: 300,
    }).start(() => {
      if (afterAnimation === 'slideup-out') {
        dispatch(setAfterAnimation('none'));
      }
    });
  };

  useEffect(() => {
    if (active) {
      animatedSlide(toValue);
    } else {
      animatedSlide(initialValue);
    }
  }, [active, initialValue, toValue]);

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
