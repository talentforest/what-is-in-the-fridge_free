import { ReactNode } from 'react';
import { View } from 'react-native';
import tw from 'twrnc';

export default function DoorContainer({ children }: { children: ReactNode }) {
  return (
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
      {children}
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
  );
}
