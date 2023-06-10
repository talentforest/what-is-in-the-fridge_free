import { Dimensions } from 'react-native';
import { Text, TouchableOpacity } from '../../native-component';
import tw from 'twrnc';

interface Props {
  btnName: string;
  onPress: () => void;
}

export default function SubmitBtn({ btnName, onPress }: Props) {
  const screenHeightPercentage = Dimensions.get('screen').height / 100;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={tw`h-[${
        screenHeightPercentage * 1.7
      }] w-full px-3 mb-1.5 flex-row items-center justify-center border border-slate-500 rounded-lg bg-indigo-500`}
    >
      <Text style={tw`text-white text-center`}>{btnName}</Text>
    </TouchableOpacity>
  );
}
