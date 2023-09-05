import { View } from 'react-native';
import ArrowBtn from '../buttons/ArrowBtn';
import StepIndicator from './StepIndicator';
import tw from 'twrnc';

interface Props {
  moveStep: (direction: 'prev' | 'next', step: number) => void;
  currentStep: number;
  stepLength: number;
}

export default function FormControlStep({
  moveStep,
  currentStep,
  stepLength,
}: Props) {
  return (
    <View style={tw`items-center flex-row justify-between mx-4 my-2`}>
      <ArrowBtn
        type='previous'
        moveStep={() => moveStep('prev', currentStep)}
        active={currentStep > 1}
      />
      <StepIndicator
        size={2.5}
        stepLength={stepLength}
        currentStepId={currentStep}
      />
      <ArrowBtn
        type='next'
        moveStep={() => moveStep('next', currentStep)}
        active={stepLength > currentStep}
      />
    </View>
  );
}
