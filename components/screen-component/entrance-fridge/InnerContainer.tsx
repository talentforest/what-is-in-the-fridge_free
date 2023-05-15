import { ReactNode } from 'react';
import { View } from 'react-native';
import tw from 'twrnc';

export default function InnerContainer({ children }: { children: ReactNode }) {
  return (
    <View style={tw`flex-1 justify-center items-center shadow-lg`}>
      {children}
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
  );
}
