import { useState } from 'react';
import { Food } from '../../constant/foodInfo';

export type AnimationState = 'none' | 'slidedown-in' | 'slideup-out';

export type onPressType = (
  setAnimationState: (state: AnimationState) => void,
  animationState: AnimationState,
  allTableItems: Food[]
) => void;

export const useSetAnimationState = () => {
  const [animationState, setAnimationState] = useState<AnimationState>('none');

  const afterAnimation = (onPress: onPressType, foodList: Food[]) => {
    if (animationState === 'slideup-out') {
      onPress(setAnimationState, animationState, foodList);
      setAnimationState('none');
    }
    if (animationState === 'slidedown-in') {
      setAnimationState('none');
    }
  };

  return {
    animationState,
    setAnimationState,
    afterAnimation,
  };
};
