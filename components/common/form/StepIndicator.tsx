import { View } from 'react-native';
import { Text } from '../../native-component';
import { FontGmarketSansBold } from '../../../constant/fonts';
import { FormStep } from '../../../constant/formInfo';
import tw from 'twrnc';

interface Props {
  formSteps: FormStep[];
  currentStepId: number;
}

export default function StepIndicator({ formSteps, currentStepId }: Props) {
  const activeStyle = (stepId: number) => {
    return currentStepId === stepId
      ? 'bg-indigo-500 border-blue-300 border'
      : '';
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
           w-5.5 h-5.5 text-center justify-center items-center rounded-full`}
        >
          <Text
            style={tw.style(
              `${activeTextStyle(step.id)} pl-[1px] pt-[1px]`,
              FontGmarketSansBold
            )}
            fontSize={10}
          >
            {step.id}
          </Text>
        </View>
      ))}
    </View>
  );
}
