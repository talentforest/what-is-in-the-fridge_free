import { Animated, View } from 'react-native';
import { Text } from '../common/native-component';
import { useItemSlideAnimation } from '../../hooks';
import tw from 'twrnc';

interface Props {
  active: boolean;
  message: string;
  color: 'green' | 'orange';
}

export default function FormMessage({ active, message, color }: Props) {
  const { height } = useItemSlideAnimation({
    initialValue: 0,
    toValue: 40,
    active,
  });

  return (
    <Animated.View style={{ height }}>
      <View style={tw`flex-row items-start mt-1`}>
        <Text fontSize={15} style={tw`text-${color}-600 leading-4 flex-1`}>
          {message}
        </Text>
      </View>
    </Animated.View>
  );
}
