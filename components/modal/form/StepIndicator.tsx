import { View } from 'react-native';
import { Text, TouchableOpacity } from '../../native-component';
import { FontGmarketSansBold } from '../../../constant/fonts';
import { FormStep } from '../../../constant/formInfo';
import tw from 'twrnc';

interface Props {
  formSteps: FormStep[];
  currentStep: FormStep;
  setCurrentStep: (formStep: FormStep) => void;
}

export default function StepIndicator({
  formSteps,
  currentStep,
  setCurrentStep,
}: Props) {
  return (
    <View style={tw`flex-row gap-3 justify-center items-center`}>
      {formSteps.map((step) => (
        <TouchableOpacity
          key={step.id}
          onPress={() => setCurrentStep(formSteps[step.id - 1])}
          style={tw`${
            currentStep.id === step.id
              ? 'bg-amber-500 border-amber-300 border'
              : 'bg-white border-slate-400'
          }  w-5.5 h-5.5 text-center justify-center items-center rounded-full`}
        >
          <Text
            style={tw.style(
              `${
                currentStep.id === step.id ? 'text-white' : 'text-slate-400'
              } pl-[1px] pt-[1px]`,
              FontGmarketSansBold
            )}
            fontSize={10}
          >
            {step.id}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
