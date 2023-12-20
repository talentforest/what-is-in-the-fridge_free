import { Text, TouchableOpacity } from '../common/native-component';
import { MEDIUM_GRAY } from '../../constant/colors';
import { shadowStyle } from '../../constant/shadowStyle';
import { useSelector } from '../../redux/hook';
import Icon from '../common/native-component/Icon';
import tw from 'twrnc';

interface Props {
  onPress: () => void;
  active: boolean;
  btnName: string;
}

export default function SpaceBtn({ onPress, active, btnName }: Props) {
  const {
    addAtOnceModal: { modalVisible },
  } = useSelector((state) => state.modalVisible);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={tw.style(
        `p-2.5 border-slate-200 border flex-row gap-1 flex-1 items-center justify-center rounded-xl 
        ${active ? 'bg-blue-600' : 'bg-white '}`,
        modalVisible ? shadowStyle(3) : null
      )}
    >
      <Icon
        name='plus'
        type='Octicons'
        size={14}
        color={active ? '#fff' : MEDIUM_GRAY}
      />
      <Text
        style={tw`${active ? 'text-white' : 'text-slate-500'}
      `}
      >
        {btnName}
      </Text>
    </TouchableOpacity>
  );
}
