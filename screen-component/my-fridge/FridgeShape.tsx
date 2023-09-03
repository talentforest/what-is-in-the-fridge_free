import { Platform, View } from 'react-native';
import { PlatformIOS } from '../../constant/statusBarHeight';
import { ReactNode } from 'react';
import { useRoute } from '@react-navigation/native';
import tw from 'twrnc';

export default function FridgeShape({ children }: { children: ReactNode }) {
  const route = useRoute();
  const routeMyFridge = route.name === 'MyFridge';

  return (
    <View style={tw`flex-1 h-full ${PlatformIOS ? 'pb-2' : ''}`}>
      <View style={tw`flex-row flex-1 mt-9`}>
        {/* 냉장고 왼쪽 옆부분 */}
        {PlatformIOS && (
          <View
            style={tw.style(
              `rounded-bl-md w-[9%] border-slate-400 border-t border-l border-b bg-stone-300`,
              {
                transform: [
                  { skewY: '45deg' },
                  { translateY: routeMyFridge ? -19 : -10 },
                ],
              }
            )}
          />
        )}
        {children}
        {/* 냉장고 오른쪽 옆부분 */}
        {PlatformIOS && (
          <View
            style={tw.style(
              `w-[3%] h-full bg-stone-300 border-slate-400 border-r border-t border-b rounded-r-md`,
              {
                transform: [
                  { skewY: '-33deg' },
                  { translateY: routeMyFridge ? 13 : 4 },
                ],
              }
            )}
          />
        )}
      </View>
      {/* 냉장고 탑 */}
      {PlatformIOS && (
        <View
          style={tw`absolute top-0 w-full flex-row ${
            routeMyFridge ? 'h-9' : 'h-4.5'
          } items-end`}
        >
          {/* 탑 안쪽 */}
          <View
            style={tw.style(
              `${
                routeMyFridge ? 'left-3.8 top-0' : 'left-1.5 top-4.5'
              } rounded-t-md absolute w-[44%] h-full border-slate-500 border border-b-0 border-l bg-stone-300`,
              Platform.select({
                ios: {
                  transform: [{ skewX: '45deg' }],
                },
              })
            )}
          />
          {/* 탑 문쪽 */}
          <View
            style={tw.style(
              `${
                routeMyFridge
                  ? '-right-2.5 -bottom-2.5 h-[20%]'
                  : '-bottom-5.5 -right-1 h-[23%]'
              } rounded-tl-md absolute  w-[52%]  border bg-stone-300 border-slate-400`,
              Platform.select({
                ios: {
                  transform: [{ skewX: '-60deg' }, { skewY: '6deg' }],
                },
              })
            )}
          />
        </View>
      )}
    </View>
  );
}
