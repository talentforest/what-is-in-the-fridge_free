import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AIcon from 'react-native-vector-icons/AntDesign';
import IIcon from 'react-native-vector-icons/Ionicons';
import FIcon from 'react-native-vector-icons/Feather';
import { INDIGO } from '../../constant/colors';
import { scaleFont } from '../../util';
import { Platform } from 'react-native';

interface IconProps {
  type: 'MaterialCommunityIcons' | 'AntDesign' | 'Ionicons' | 'Feather';
  name: string;
  size?: number;
  color?: string;
}

export default function Icon({
  type,
  name,
  size = 16,
  color = INDIGO,
}: IconProps) {
  const android = Platform.OS === 'android';
  const PLATFORM_RATIO = android ? 1.3 : 1;
  return (
    <>
      {type === 'MaterialCommunityIcons' && (
        <MIcon
          name={name}
          size={scaleFont(size) * PLATFORM_RATIO}
          color={color}
        />
      )}
      {type === 'AntDesign' && (
        <AIcon
          name={name}
          size={scaleFont(size) * PLATFORM_RATIO}
          color={color}
        />
      )}
      {type === 'Ionicons' && (
        <IIcon
          name={name}
          size={scaleFont(size) * PLATFORM_RATIO}
          color={color}
        />
      )}
      {type === 'Feather' && (
        <FIcon
          name={name}
          size={scaleFont(size) * PLATFORM_RATIO}
          color={color}
        />
      )}
    </>
  );
}
