import { ReactNode } from 'react';
import { Platform, View } from 'react-native';
import tw from 'twrnc';
import { useSelector } from '../../../redux/hook';

export default function InnerContainer({ children }: { children: ReactNode }) {
  const platformIos = Platform.OS === 'ios';
  const { fridgeInfo } = useSelector((state) => state.fridgeInfo);

  return (
    <View
      style={tw`${
        fridgeInfo.freezer === 'bottom' ? 'flex-col-reverse' : ''
      } flex-1 justify-center items-center rounded-lg`}
    >
      {children}
      {platformIos && (
        <>
          <View
            style={tw.style(
              'border border-slate-400 bg-slate-200 absolute -top-2 w-full h-7 rounded-t-md',
              {
                transform: [
                  { skewX: '50deg' },
                  { translateX: 6 },
                  { translateY: -18 },
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
        </>
      )}
    </View>
  );
}
