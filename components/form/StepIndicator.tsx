import { View } from 'react-native';
import { Text } from '../common/native-component';
import { FontGmarketSansBold } from '../../constant/fonts';
import { FormStep } from '../../constant/formInfo';
import tw from 'twrnc';

interface Props {
  formSteps: FormStep[];
  currentStepId: number;
}

export default function StepIndicator({ formSteps, currentStepId }: Props) {
  const activeStyle = (stepId: number) => {
    return currentStepId === stepId ? 'bg-blue-600 border-blue-300 border' : '';
  };

  const activeTextStyle = (stepId: number) => {
    return currentStepId === stepId ? 'text-white' : 'text-slate-500';
  };

  return (
    <View style={tw`flex-row gap-3 justify-center items-center`}>
      {formSteps.map((step) => (
        <View
          key={step.id}
          style={tw`${activeStyle(step.id)}
           w-6 h-6 text-center justify-center items-center rounded-full`}
        >
          <Text
            style={tw.style(
              `${activeTextStyle(step.id)} pl-0.5 pt-0.5 text-xs`,
              FontGmarketSansBold
            )}
          >
            {step.id}
          </Text>
        </View>
      ))}
    </View>
  );
}
