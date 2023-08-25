import { DEEP_INDIGO } from '../../../constant/colors';
import { TouchableOpacity } from '../../native-component';
import Icon from '../../native-component/Icon';
import tw from 'twrnc';

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MoreOpenBtn({ isOpen, setIsOpen }: Props) {
  return (
    <TouchableOpacity
      onPress={() => setIsOpen((prev: any) => !prev)}
      style={tw`w-8 h-8 pt-0.5 justify-center items-center border border-indigo-400 bg-amber-300 rounded-full`}
    >
      <Icon
        name={isOpen ? 'chevron-up' : 'chevron-down'}
        type='MaterialCommunityIcons'
        size={20}
        color={DEEP_INDIGO}
      />
    </TouchableOpacity>
  );
}
