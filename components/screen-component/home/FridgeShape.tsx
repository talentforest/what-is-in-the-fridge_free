import { View } from 'react-native';
import tw from 'twrnc';

export default function FridgeShape() {
  return (
    <View style={tw`border w-12 border-slate-400 bg-neutral-300 rounded-[4px]`}>
      <View style={tw`border-b-4 border-slate-600 w-full h-8`}></View>
      <View style={tw`flex-1 items-center`}>
        <View style={tw`w-3/5 h-1 bg-slate-600`} />
      </View>
    </View>
  );
}
