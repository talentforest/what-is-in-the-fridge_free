import { GRAY } from '../../constant/colors';
import { formattedToday } from '../../util';
import { TouchableOpacity } from '../common/native-component';
import Icon from '../common/native-component/Icon';
import tw from 'twrnc';

interface Props {
  changeDate: (newDate: Date | string) => void;
}

export default function RestoreDateBtn({ changeDate }: Props) {
  return (
    <TouchableOpacity
      onPress={() => changeDate(new Date(formattedToday))}
      style={tw.style(
        `border border-slate-100 bg-white h-10 w-10 rounded-xl items-center justify-center`
      )}
    >
      <Icon name='sync' type='Octicons' size={13} color={GRAY} />
    </TouchableOpacity>
  );
}
