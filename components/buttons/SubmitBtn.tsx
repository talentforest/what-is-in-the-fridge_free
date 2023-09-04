import { Text, TouchableOpacity } from '../common/native-component';
import { GRAY } from '../../constant/colors';
import Icon from '../common/native-component/Icon';
import tw from 'twrnc';

interface Props {
  btnName: string;
  onPress: () => void;
}

export default function SubmitBtn({ btnName, onPress }: Props) {
  const bgColor =
    btnName === '다 먹었어요'
      ? 'bg-blue-500 border-blue-400 text-white'
      : 'bg-blue-200 border-blue-300 text-slate-700';

  const iconName =
    btnName === '다 먹었어요' ? 'check-circle-outline' : 'pencil-outline';

  return (
    <TouchableOpacity
      onPress={onPress}
      style={tw`${bgColor} p-3.5 flex-row items-center justify-center border gap-1 rounded-lg`}
    >
      <Text style={tw`${bgColor} text-center text-base`}>{btnName}</Text>
      <Icon
        name={iconName}
        type='MaterialCommunityIcons'
        color={btnName === '식료품 정보 수정하기' ? GRAY : '#fff'}
        size={18}
      />
    </TouchableOpacity>
  );
}
