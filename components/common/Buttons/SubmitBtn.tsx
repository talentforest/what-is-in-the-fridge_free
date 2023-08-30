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
      style={tw`py-3.5 mx-6 flex-row items-center justify-center border border-slate-500 rounded-lg bg-blue-600`}
    >
      <Text style={tw`text-white text-center text-base`}>{btnName}</Text>
    </TouchableOpacity>
  );
}
