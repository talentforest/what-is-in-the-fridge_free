import { useWindowDimensions } from 'react-native';
import {
  BLUE,
  GRAY,
  GREEN,
  INDIGO,
  AMBER,
  ORANGE_RED,
  RED,
} from '../../../constant/colors';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import OIcon from 'react-native-vector-icons/Octicons';

interface IconProps {
  type: 'MaterialCommunityIcons' | 'Octicons';
  name: string;
  size?: number;
  color?: string;
}

export default function Icon({
  type,
  name,
  size = 16,
  color = BLUE,
}: IconProps) {
  const { height } = useWindowDimensions();

  const iconSize = height > 900 ? size + 4 : size;

  const iconColor =
    color === 'amber'
      ? AMBER
      : color === 'blue'
      ? BLUE
      : color === 'indigo'
      ? INDIGO
      : color === 'orange'
      ? ORANGE_RED
      : color === 'gray'
      ? GRAY
      : color === 'red'
      ? RED
      : color === 'green'
      ? GREEN
      : color;

  return (
    <>
      {type === 'MaterialCommunityIcons' && (
        <MIcon name={name} size={iconSize} color={iconColor} />
      )}
      {type === 'Octicons' && (
        <OIcon
          name={name}
          size={iconSize}
          color={iconColor}
          style={{ paddingHorizontal: 2 }}
        />
      )}
    </>
  );
}
