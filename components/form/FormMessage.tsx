import { Animated, View } from 'react-native';
import { Text } from '../common/native-component';
import { useSlideAnimation } from '../../hooks';
import tw from 'twrnc';

interface Props {
  active: boolean;
  message: string;
  color: 'green' | 'orange';
}

export default function FormMessage({ active, message, color }: Props) {
  const { height } = useSlideAnimation({
    initialValue: 0,
    toValue: 24,
    active,
  });

  return (
    <Animated.View style={{ height }}>
      <View style={tw`flex-row items-start mt-0.5`}>
        <Text fontSize={15} style={tw`text-${color}-600 flex-1`}>
          {message}
        </Text>
      </View>
    </Animated.View>
  );
}
