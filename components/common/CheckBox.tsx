import { BLUE } from '../../constant/colors';
import Icon from './native-component/Icon';

interface Props {
  checked: boolean;
  inActiveColor?: string;
  size?: number;
}

export default function CheckBox({
  checked,
  inActiveColor = '#bbb',
  size = 18,
}: Props) {
  return (
    <Icon
      type='Ionicons'
      name={checked ? 'checkbox' : 'square-outline'}
      color={checked ? BLUE : inActiveColor}
      size={size}
    />
  );
}
