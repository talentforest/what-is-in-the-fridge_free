import { useEffect, useRef, useState } from 'react';
import { Animated, Easing } from 'react-native';

export const usePulseAnimation = ({ active }: { active: boolean }) => {
  const [bgColor, setBgColor] = useState('#ffc2c2');
  const opacity = useRef(new Animated.Value(1)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  const animateOpacity = (toValue: number, duration = 500) => {
    return Animated.timing(opacity, {
      toValue,
      duration,
      easing: Easing.linear,
      useNativeDriver: true,
    });
  };

  const animateTranslateY = (toValue: number, duration = 100) => {
    return Animated.timing(translateY, {
      toValue,
      duration,
      easing: Easing.linear,
      useNativeDriver: true,
    });
  };

  const animatePulse = () => {
    let animation = Animated.loop(
      Animated.parallel([
        Animated.sequence([
          animateTranslateY(0),
          animateTranslateY(-2),
          animateTranslateY(2),
          animateTranslateY(0),
        ]),
        Animated.sequence([
          animateOpacity(1, 100),
          animateOpacity(0.4),
          animateOpacity(1),
        ]),
      ])
    );

    setTimeout(() => {
      animation.stop();
      opacity.setValue(1);
      translateY.setValue(0);
      setBgColor('#fff');
    }, 4000);
    animation.start();
  };

  useEffect(() => {
    if (active) {
      animatePulse();
    }
  }, [active]);

  return {
    opacity,
    translateY,
    bgColor,
  };
};
