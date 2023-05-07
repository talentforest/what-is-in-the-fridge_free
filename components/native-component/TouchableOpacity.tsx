import {
  TouchableOpacity as Touchable,
  TouchableOpacityProps,
} from 'react-native';

interface Props extends TouchableOpacityProps {
  onPress: () => void;
}

export function TouchableOpacity({ onPress, ...props }: Props) {
  return <Touchable activeOpacity={0.8} onPress={onPress} {...props} />;
}
