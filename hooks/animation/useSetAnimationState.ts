import { useState } from 'react';
import { Food, PantryFood } from '../../constant/foodInfo';

export type AnimationState = 'none' | 'slidedown-in' | 'slideup-out';

export const useSetAnimationState = () => {
  const [animationState, setAnimationState] = useState<AnimationState>('none');

  const afterAnimation = (
    onDeletePress: (
      allTableItems: (Food | PantryFood)[],
      setAnimationState?: (state: AnimationState) => void,
      animationState?: AnimationState
    ) => void,
    foodList: (Food | PantryFood)[]
  ) => {
    if (animationState === 'slideup-out') {
      onDeletePress(foodList, setAnimationState, animationState);
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
