import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AIcon from 'react-native-vector-icons/AntDesign';
import IIcon from 'react-native-vector-icons/Ionicons';
import FIcon from 'react-native-vector-icons/Feather';
import { INDIGO } from '../../constant/colors';
import { responsiveFontSize } from '../../util';

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
  return (
    <>
      {type === 'MaterialCommunityIcons' && (
        <MIcon name={name} size={responsiveFontSize(size)} color={color} />
      )}
      {type === 'AntDesign' && (
        <AIcon name={name} size={responsiveFontSize(size)} color={color} />
      )}
      {type === 'Ionicons' && (
        <IIcon name={name} size={responsiveFontSize(size)} color={color} />
      )}
      {type === 'Feather' && (
        <FIcon name={name} size={responsiveFontSize(size)} color={color} />
      )}
    </>
  );
}
