import { Text, TouchableOpacity } from '../../native-component';
import tw from 'twrnc';

interface Props {
  btnName: string;
  onPress: () => void;
}

export default function SubmitBtn({ btnName, onPress }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={tw`w-full mt-1.5 px-3 py-4 flex-row items-center justify-center border border-slate-500 rounded-lg bg-indigo-500`}
    >
      <Text styletw='text-white text-center'>{btnName}</Text>
    </TouchableOpacity>
  );
}
