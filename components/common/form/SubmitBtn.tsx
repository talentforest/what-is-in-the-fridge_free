import { scaleH } from '../../../util';
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
      style={tw`py-[${scaleH(18)}px] 
      mx-6 flex-row items-center justify-center border border-slate-500 rounded-lg bg-indigo-500`}
    >
      <Text style={tw`text-white text-center`}>{btnName}</Text>
    </TouchableOpacity>
  );
}
