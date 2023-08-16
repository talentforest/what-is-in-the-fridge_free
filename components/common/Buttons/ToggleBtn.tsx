import { Text, TouchableOpacity } from '../../native-component';
import tw from 'twrnc';

interface ToggleBtnProps {
  check: boolean;
  onPress: () => void;
  btnName: string;
}

export default function ToggleBtn({ check, onPress, btnName }: ToggleBtnProps) {
  return (
    <TouchableOpacity
      style={tw`z-10 flex-row items-center justify-center gap-2 h-full px-3 w-22`}
      onPress={onPress}
    >
      <Text style={tw`${check ? 'text-white' : 'text-slate-500'}`}>
        {btnName}
      </Text>
    </TouchableOpacity>
  );
}
