import { View } from 'react-native';
import Space from './Space';
import tw from 'twrnc';

export default function OpenFridge() {
  return (
    <View style={tw`shadow-lg h-120 flex-row items-start`}>
      <View style={tw`flex-1 justify-center items-center shadow-lg`}>
        <Space space='냉동실 안쪽' />
        <Space space='냉장실 안쪽' bottom />
        <View
          style={tw.style(
            'border border-slate-400 bg-slate-200 absolute -top-2 w-full h-7 rounded-t-md',
            {
              transform: [
                { skewX: '50deg' },
                { translateX: 6 },
                { translateY: -18 },
                { perspective: 1000 },
              ],
            }
          )}
        />
        <View
          style={tw.style(
            'border border-slate-400 bg-slate-200 absolute -left-22 h-full w-7.5',
            {
              transform: [
                { skewY: '40deg' },
                { translateX: 60 },
                { translateY: -62 },
              ],
            }
          )}
        />
      </View>
      <View
        style={tw.style('w-[46%] shadow-lg justify-center items-center', {
          transform: [
            { skewY: '10deg' },
            { translateY: 14 },
            { perspective: 1000 },
          ],
          transformOrigin: 'bottom left',
        })}
      >
        <Space space='냉동실 문쪽' door />
        <Space space='냉장실 문쪽' door bottom />
        <View
          style={tw.style(
            'border absolute -top-4 w-full h-2.5 rounded-t-md border-slate-400',
            {
              transform: [
                { skewX: '-63deg' },
                { translateY: 7 },
                { translateX: 22 },
                { perspective: 1000 },
              ],
            }
          )}
        />
        <View
          style={tw.style(
            'border border-slate-400 bg-slate-200 rounded-br-lg rounded-tr-sm w-4 absolute h-full -right-4',
            {
              transform: [
                { skewY: '-30deg' },
                { translateY: -5 },
                { perspective: 1000 },
              ],
            }
          )}
        />
      </View>
    </View>
  );
}
