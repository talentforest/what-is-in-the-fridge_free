import { Text, TouchableOpacity } from '../common/native-component';
import tw from 'twrnc';
import Icon from '../common/native-component/Icon';
import { BLUE } from '../../constant/colors';

interface Props {
  onPress: () => void;
  active: boolean;
  btnName: string;
}

export default function SpaceBtn({ onPress, active, btnName }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={tw`px-2.5 rounded-lg ${
        active ? 'bg-blue-600' : 'bg-white '
      } border-slate-300 border flex-row gap-1 flex-1 items-center justify-center py-1.5`}
    >
      <Icon
        name='plus'
        type='Feather'
        size={15}
        color={active ? '#fff' : BLUE}
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
