import { View } from 'react-native';
import tw from 'twrnc';

export default function FridgeShape() {
  return (
    <View style={tw`pt-5 pr-5.5 w-17`}>
      <View
        style={tw`border border-slate-400 bg-neutral-200 my-2 ml-5.5 w-full h-20 rounded-md rounded-tl-none`}
      >
        <View style={tw`border-b-4 border-slate-600 w-full h-2/5.5`}></View>
        <View style={tw`flex-1 items-center`}>
          <View style={tw`w-3/5 h-1.5 bg-slate-600`} />
        </View>
        <View
          style={tw.style(
            'border border-slate-400 bg-neutral-200 absolute w-full top-0.5ㄴ h-4 rounded-t-md',
            {
              transform: [
                { skewX: '50deg' },
                { translateX: 12 },
                { translateY: -18 },
              ],
            }
          )}
        />
        <View
          style={tw.style(
            'border border-slate-400 rounded-sm bg-neutral-200 absolute -left-4 top-0.5 h-full w-4 rounded-tr-none',
            {
              transform: [
                { skewY: '43deg' },
                { translateX: 0 },
                { translateY: -10 },
              ],
            }
          )}
        />
      </View>
    </View>
  );
}
