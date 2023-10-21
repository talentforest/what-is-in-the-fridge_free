import { Text, TouchableOpacity } from '../common/native-component';
import tw from 'twrnc';

interface Props {
  onPress: () => void;
  active: boolean;
  btnName: string;
}

export default function SpaceBtn({ onPress, active, btnName }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={tw`px-2.5 rounded-lg  ${
        active ? 'bg-indigo-600' : 'bg-white '
      } border-slate-300 border flex-row gap-0.5 flex-1 items-center justify-center py-2.5`}
    >
      <Text
        style={tw`text-[15px] ${active ? 'text-white' : 'text-slate-500'}
      `}
      >
        {btnName}
      </Text>
    </TouchableOpacity>
  );
}
