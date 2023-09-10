import { View } from 'react-native';
import { useRoute } from '@react-navigation/native';
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
  const route = useRoute();
  const routePantryFoods = route.name === 'PantryFoods';

  return (
    <View>
      {!routePantryFoods ? (
        <View style={tw`items-center flex-row justify-between mx-4`}>
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
      ) : (
        <View style={tw`py-4`}>
          <StepIndicator
            size={2.5}
            stepLength={stepLength}
            currentStepId={currentStep}
          />
        </View>
      )}
    </View>
  );
}
