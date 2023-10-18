import { Text, TouchableOpacity } from '../common/native-component';
import tw from 'twrnc';
import Icon from '../common/native-component/Icon';
import { GRAY } from '../../constant/colors';

interface Props {
  onPress: () => void;
  active: boolean;
  btnName: string;
  tab?: boolean;
}

export default function SpaceBtn({ onPress, active, btnName, tab }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={tw`px-2.5 rounded-lg  ${
        active && tab
          ? 'bg-blue-600'
          : active
          ? 'bg-amber-500'
          : 'bg-white border-slate-300 border'
      } ${
        tab
          ? 'flex-row gap-0.5 flex-1 items-center justify-center py-2.5'
          : 'py-0.8'
      }`}
    >
      {tab && (
        <Icon
          name={btnName === '냉장고' ? 'fridge-outline' : 'box'}
          type={btnName === '냉장고' ? 'MaterialCommunityIcons' : 'Feather'}
          size={btnName === '냉장고' ? 16 : 15}
          color={active ? '#fff' : GRAY}
        />
      )}
      <Text
        style={tw`text-[15px] ${
          active ? 'text-white' : tab ? 'text-slate-700' : 'text-slate-400'
        }
      `}
      >
        {btnName}
      </Text>
    </TouchableOpacity>
  );
}
