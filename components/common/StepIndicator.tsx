import { View } from 'react-native';
import tw from 'twrnc';

interface Props {
  stepLength: number;
  currentStepId: number;
  size?: number;
  color?: string;
}

export default function StepIndicator({
  stepLength,
  currentStepId,
  size = 2.5,
  color = 'blue',
}: Props) {
  const activeStyle = (stepId: number) => {
    return currentStepId === stepId
      ? `bg-${color}-500 w-${size} h-${size}`
      : `bg-${color}-300 w-${size - 0.3} h-${size - 0.3}`;
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
