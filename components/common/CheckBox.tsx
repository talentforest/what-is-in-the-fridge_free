import { BLUE } from '../../constant/colors';
import Icon from './native-component/Icon';

interface Props {
  checked: boolean;
  activeColor?: string;
  inActiveColor?: string;
  size?: number;
}

export default function CheckBox({
  checked,
  activeColor = BLUE,
  inActiveColor = '#dddddd',
  size = 13,
}: Props) {
  return (
    <Icon
      type='Octicons'
      name={checked ? 'check-circle-fill' : 'circle'}
      color={checked ? activeColor : inActiveColor}
      size={size}
    />
  );
}
