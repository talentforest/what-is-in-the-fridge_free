import { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, PanResponder } from 'react-native';
import { OnboardingStep } from '../../constant/onboardingInfo';
import { FormStep } from '../../constant/formInfo';

const DRAG_DISTANCE = 60;
const FORM_WIDTH = Dimensions.get('screen').width;

interface Props {
  steps: OnboardingStep[] | FormStep[];
}

export const useSwiperAnimation = ({ steps }: Props) => {
  const [currentStep, setCurrentStep] = useState(steps[0]);

  const currentStepRef = useRef(steps[0]);
  const stepTranslateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    currentStepRef.current = currentStep;
  }, [currentStep]);

  const animatedForm = (stepId: number) => {
    Animated.timing(stepTranslateX, {
      toValue: -FORM_WIDTH * stepId,
      useNativeDriver: true,
      duration: 400,
    }).start();
  };

  const moveStep = (direction: 'prev' | 'next', currentStepId: number) => {
    const prevStepId = currentStepId === 1 ? 0 : currentStepId - 2;
    const nextStepId =
      currentStepId === steps.length ? currentStepId - 1 : currentStepId;
    const stepId = direction === 'prev' ? prevStepId : nextStepId;

    animatedForm(stepId);
    setCurrentStep(steps[stepId]);
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
      onPanResponderGrant: () => {
        stepTranslateX.setValue(
          -FORM_WIDTH * (currentStepRef.current.step - 1)
        );
      },
      onPanResponderMove: (_, { dx }) => {
        stepTranslateX.setValue(
          -FORM_WIDTH * (currentStepRef.current.step - 1) + dx
        );
      },
      onPanResponderRelease: (_, { dx }) => {
        if ((0 > dx && dx > -DRAG_DISTANCE) || (0 < dx && dx < DRAG_DISTANCE)) {
          return animatedForm(currentStepRef.current.step - 1);
        }
        if (dx > DRAG_DISTANCE) {
          return moveStep('prev', currentStepRef.current.step);
        }
        if (dx < -DRAG_DISTANCE) {
          return moveStep('next', currentStepRef.current.step);
        }
      },
    })
  ).current;

  return {
    FORM_WIDTH,
    stepTranslateX,
    panResponder,
    moveStep,
    currentStep,
  };
};
