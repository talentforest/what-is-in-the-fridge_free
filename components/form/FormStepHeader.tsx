import { View } from 'react-native';
import { FormStep } from '../../constant/formInfo';
import { Text } from '../common/native-component';
import Icon from '../common/native-component/Icon';
import tw from 'twrnc';

interface Props {
  formSteps: FormStep[];
  currentStep: FormStep;
}

export default function FormStepHeader({ formSteps, currentStep }: Props) {
  return (
    <View style={tw`flex-row items-center mx-6 my-1 py-2`}>
      {formSteps.map(({ step, name }) => (
        <View key={step} style={tw`flex-row items-center justify-center`}>
          {step !== 1 && (
            <View
              style={tw`w-5 mx-0 rounded-full border-b-2 ${
                currentStep.step === step - 1
                  ? 'border-amber-500'
                  : 'border-slate-300'
              }`}
            />
          )}
          <View style={tw`flex-row items-center gap-0.5`}>
            <Icon
              name={`numeric-${step}-box-multiple${
                currentStep.step === step ? '' : '-outline'
              }`}
              type='MaterialCommunityIcons'
              size={14}
              color={currentStep.step === step ? 'amber' : '#999999'}
            />
            <Text
              style={tw`${
                currentStep.step === step ? 'text-amber-700' : 'text-slate-500'
              } text-[13px]`}
            >
              {name}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}
