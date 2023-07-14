import { INACTIVE_COLOR } from '../../../constant/colors';
import Icon from '../../native-component/Icon';

interface Props {
  checked: boolean;
  activeColor: string;
}

export default function CheckBox({ checked, activeColor }: Props) {
  return (
    <Icon
      type='MaterialCommunityIcons'
      name={checked ? 'checkbox-marked' : 'square-outline'}
      color={checked ? activeColor : INACTIVE_COLOR}
      size={18}
    />
  );
}
