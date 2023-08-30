import { GRAY } from '../../constant/colors';
import Icon from '../native-component/Icon';

interface Props {
  checked: boolean;
  activeColor: string;
  size?: number;
}

export default function CheckBox({ checked, activeColor, size = 16 }: Props) {
  return (
    <Icon
      type='Ionicons'
      name={checked ? 'checkbox' : 'square-outline'}
      color={checked ? activeColor : GRAY}
      size={size}
    />
  );
}
