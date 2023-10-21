import { View } from 'react-native';
import { FormStep } from '../../constant/formInfo';
import { Text } from '../common/native-component';
import tw from 'twrnc';

interface Props {
  formSteps: FormStep[];
  currentStep: FormStep;
}

export default function FormStepHeader({ formSteps, currentStep }: Props) {
  return (
    <View style={tw`flex-row items-center mx-6 pt-1 min-h-10`}>
      {formSteps.map(({ step, name }) => (
        <View key={step} style={tw`flex-row items-center justify-center`}>
          {step !== 1 && (
            <View
              style={tw`w-5 mx-0 rounded-full border-b ${
                currentStep.step === step - 1
                  ? 'border-amber-400'
                  : 'border-slate-300'
              }`}
            />
          )}
          <View style={tw`flex-row items-center gap-0.5`}>
            <Text
              style={tw`${
                currentStep.step === step ? 'text-amber-500' : 'text-slate-500'
              } text-[13px] pl-0.3`}
            >
              {name}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}
