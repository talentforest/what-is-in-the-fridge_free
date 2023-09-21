import { BLUE } from '../../constant/colors';
import { TouchableOpacity } from '../common/native-component';
import Icon from '../common/native-component/Icon';
import tw from 'twrnc';

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MoreOpenBtn({ isOpen, setIsOpen }: Props) {
  return (
    <TouchableOpacity
      onPress={() => setIsOpen((prev) => !prev)}
      style={tw`w-8 h-8 pt-0.5 justify-center items-center border border-blue-400 bg-blue-100 rounded-full`}
    >
      <Icon
        name={isOpen ? 'chevron-up' : 'chevron-down'}
        type='MaterialCommunityIcons'
        size={20}
        color={BLUE}
      />
    </TouchableOpacity>
  );
}
