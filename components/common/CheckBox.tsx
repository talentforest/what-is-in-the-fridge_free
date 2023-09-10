import { BLUE } from '../../constant/colors';
import Icon from './native-component/Icon';

interface Props {
  checked: boolean;
  activeColor?: string;
  size?: number;
}

export default function CheckBox({
  checked,
  activeColor = BLUE,
  size = 18,
}: Props) {
  return (
    <Icon
      type='Ionicons'
      name={checked ? 'checkbox' : 'square-outline'}
      color={checked ? activeColor : '#bbb'}
      size={size}
    />
  );
}
