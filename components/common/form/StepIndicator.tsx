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
  return (
    <View style={tw`flex-row gap-3 justify-center items-center`}>
      {formSteps.map((step) => (
        <View
          key={step.id}
          style={tw`${
            currentStepId === step.id
              ? 'bg-amber-500 border-amber-300 border'
              : 'bg-white border-slate-400'
          }  w-5.5 h-5.5 text-center justify-center items-center rounded-full`}
        >
          <Text
            style={tw.style(
              `${
                currentStepId === step.id ? 'text-white' : 'text-slate-400'
              } pl-[1px] pt-[1px]`,
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
