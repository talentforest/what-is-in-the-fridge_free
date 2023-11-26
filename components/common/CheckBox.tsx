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
  size = 17,
}: Props) {
  return (
    <Icon
      type='Octicons'
      name={checked ? 'check-circle-fill' : 'circle'}
      color={checked ? BLUE : inActiveColor}
      size={size - 3}
    />
  );
}
