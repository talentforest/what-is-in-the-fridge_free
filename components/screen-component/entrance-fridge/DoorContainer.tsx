import { ReactNode } from 'react';
import { Platform, View } from 'react-native';
import tw from 'twrnc';

export default function DoorContainer({ children }: { children: ReactNode }) {
  const platformIos = Platform.OS === 'ios';
  return (
    <View
      style={tw.style(
        `${platformIos ? 'w-[45%]' : 'flex-1'} justify-center items-center`,
        {
          transform: Platform.select({
            ios: [
              { skewY: '10deg' },
              { translateY: 13 },
              { perspective: 1000 },
            ],
          }),
        }
      )}
    >
      {children}
      {platformIos && (
        <>
          <View
            style={tw.style(
              'border absolute -top-4 w-full h-2.5 rounded-t-md border-slate-400 bg-slate-200',
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
              'border border-l-0 border-slate-400 bg-slate-200 rounded-br-lg rounded-tr-sm w-4 absolute h-full -right-4',
              {
                transform: [
                  { skewY: '-30deg' },
                  { translateY: -5 },
                  { perspective: 1000 },
                ],
              }
            )}
          />
        </>
      )}
    </View>
  );
}
