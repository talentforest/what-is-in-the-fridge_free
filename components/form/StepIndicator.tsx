import { View } from 'react-native';
import { Text } from '../common/native-component';
import { FontGmarketSansBold } from '../../constant/fonts';
import tw from 'twrnc';

interface Props {
  stepLength: number;
  currentStepId: number;
}

export default function StepIndicator({ stepLength, currentStepId }: Props) {
  const activeStyle = (stepId: number) => {
    return currentStepId === stepId
      ? 'bg-blue-700 w-3 h-3 '
      : 'bg-blue-300 w-2.5 h-2.5 ';
  };

  const stepNumLength = Array.from(
    { length: stepLength },
    (_, index) => index + 1
  );

  return (
    <View style={tw`flex-row gap-3 justify-center items-center`}>
      {stepNumLength.map((step) => (
        <View
          key={step}
          style={tw`${activeStyle(step)}
           text-center justify-center items-center rounded-full`}
        />
      ))}
    </View>
  );
}
