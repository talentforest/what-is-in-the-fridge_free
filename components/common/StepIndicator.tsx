import { View } from 'react-native';
import tw from 'twrnc';

interface Props {
  stepLength: number;
  currentStepId: number;
  size?: number;
}

export default function StepIndicator({
  stepLength,
  currentStepId,
  size = 3,
}: Props) {
  const activeStyle = (stepId: number) => {
    return currentStepId === stepId
      ? `bg-blue-700 w-${size} h-${size}`
      : `bg-blue-300 w-${size - 0.5} h-${size - 0.5}`;
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
