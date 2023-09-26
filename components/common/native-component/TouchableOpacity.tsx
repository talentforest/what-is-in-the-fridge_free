import {
  TouchableOpacity as Touchable,
  TouchableOpacityProps,
} from 'react-native';

interface Props extends TouchableOpacityProps {
  onPress: () => void;
}

export function TouchableOpacity<T>({ onPress, ...props }: Props) {
  return <Touchable activeOpacity={0.9} onPress={onPress} {...props} />;
}
