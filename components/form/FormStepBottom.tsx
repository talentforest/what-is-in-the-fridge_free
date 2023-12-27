import { View } from 'react-native';
import ArrowBtn from '../buttons/ArrowBtn';
import StepIndicator from '../common/StepIndicator';
import tw from 'twrnc';

interface Props {
  moveStep: (direction: 'prev' | 'next', step: number) => void;
  currentStep: number;
  stepLength: number;
}

export default function FormStepBottom({
  moveStep,
  currentStep,
  stepLength,
}: Props) {
  return (
    <View style={tw`h-8 items-center flex-row justify-between`}>
      <ArrowBtn
        type='previous'
        moveStep={() => moveStep('prev', currentStep)}
        active={currentStep > 1}
      />
      <StepIndicator
        stepLength={stepLength}
        currentStepId={currentStep}
        color='gray'
      />
      <ArrowBtn
        type='next'
        moveStep={() => moveStep('next', currentStep)}
        active={stepLength > currentStep}
      />
    </View>
  );
}
