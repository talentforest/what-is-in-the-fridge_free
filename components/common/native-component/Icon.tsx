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
import FIcon from 'react-native-vector-icons/Feather';

interface IconProps {
  type: 'MaterialCommunityIcons' | 'Feather';
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
        <MIcon name={name} size={size} color={iconColor} />
      )}
      {type === 'Feather' && (
        <FIcon name={name} size={size} color={iconColor} />
      )}
    </>
  );
}
