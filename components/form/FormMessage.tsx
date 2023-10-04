import { Animated, View } from 'react-native';
import { Text } from '../common/native-component';
import tw from 'twrnc';
import { useSlideAnimation } from '../../hooks';

interface Props {
  active: boolean;
  message: string;
  color: 'green' | 'orange';
}

export default function FormMessage({ active, message, color }: Props) {
  const { height } = useSlideAnimation({
    initialValue: 0,
    toValue: 22,
    active,
  });

  return (
    <Animated.View style={{ height }}>
      <View style={tw`flex-row items-start mt-1`}>
        <Text style={tw`text-${color}-600 flex-1 text-xs`}>{message}</Text>
      </View>
    </Animated.View>
  );
}
