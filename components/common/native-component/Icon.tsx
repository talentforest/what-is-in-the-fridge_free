import { useWindowDimensions } from 'react-native';
import { BLUE } from '../../../constant/colors';
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

  return (
    <>
      {type === 'MaterialCommunityIcons' && (
        <MIcon name={name} size={iconSize} color={color} />
      )}
      {type === 'Octicons' && (
        <OIcon
          name={name}
          size={iconSize}
          color={color}
          style={{ paddingHorizontal: 2 }}
        />
      )}
    </>
  );
}
