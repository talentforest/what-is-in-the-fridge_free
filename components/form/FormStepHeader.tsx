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
    <View style={tw`flex-row items-center mx-6 min-h-10`}>
      {formSteps.map(({ step, name }) => (
        <View key={step} style={tw`flex-row items-center justify-center`}>
          {step !== 1 && (
            <View
              style={tw`w-5 rounded-full h-0.4 mx-0.2 ${
                currentStep.step === step - 1 ? 'bg-amber-500' : 'bg-slate-400'
              }`}
            />
          )}
          <View style={tw`flex-row items-center gap-0.5`}>
            <Text
              style={tw`text-[15px] pl-0.3 ${
                currentStep.step === step ? 'text-amber-500' : 'text-slate-500'
              }`}
            >
              {name}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}
