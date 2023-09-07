import { INDIGO, LIGHT_GRAY } from '../../constant/colors';
import { Text, TouchableOpacity } from '../common/native-component';
import Icon from '../common/native-component/Icon';
import tw from 'twrnc';

interface Props {
  onPress: () => void;
  disabled: boolean;
  name: string;
  icon: string;
}

export default function SquareBtn({ onPress, disabled, name, icon }: Props) {
  const bgColor = name === '장보기 목록 추가' ? 'bg-blue-600' : 'bg-slate-600';

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={tw`h-10.5 flex-row items-center ${bgColor} pr-3 pl-2.5 gap-0.5 rounded-lg`}
    >
      <Icon type='MaterialCommunityIcons' name={icon} size={16} color='#fff' />
      <Text style={tw`text-[15px] text-white`}>{name}</Text>
    </TouchableOpacity>
  );
}
