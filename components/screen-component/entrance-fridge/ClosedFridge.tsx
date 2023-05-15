import { View } from 'react-native';
import { TouchableOpacity } from '../../native-component';
import tw from 'twrnc';

interface Props {
  onTogglePress: () => void;
}

export default function ClosedFridge({ onTogglePress }: Props) {
  return (
    <TouchableOpacity
      onPress={onTogglePress}
      style={tw`flex-1 justify-center items-center`}
    >
      <View style={tw`h-4/5 w-4/5 p-3`}>
        <View
          style={tw`z-10 border border-slate-300 bg-slate-200 h-2/5 rounded-t-xl shadow-lg`}
        >
          <View
            style={tw`border border-slate-400 absolute h-10 w-3 rounded-lg bg-slate-500 left-4 bottom-4`}
          ></View>
        </View>
        <View
          style={tw`border border-slate-300 bg-slate-200 h-3/5 rounded-b-xl shadow-lg`}
        >
          <View
            style={tw`border border-slate-400 absolute h-10 w-3 rounded-md bg-slate-500 left-4 top-4`}
          ></View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
