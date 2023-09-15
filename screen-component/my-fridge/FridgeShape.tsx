import { Platform, View } from 'react-native';
import { PlatformIOS } from '../../constant/statusBarHeight';
import { ReactNode } from 'react';
import { useRoute } from '@react-navigation/native';
import tw from 'twrnc';

export const FRIDGE_COLOR = 'bg-stone-300 border-stone-400';

export default function FridgeShape({ children }: { children: ReactNode }) {
  const route = useRoute();
  const routeMyFridge = route.name === 'MyFridge';

  return (
    <View style={tw`flex-1 h-full ${PlatformIOS ? 'pb-2' : ''}`}>
      <View style={tw`flex-row flex-1 ${PlatformIOS ? 'mt-9' : ''}`}>
        {/* 냉장고 왼쪽 옆부분 */}
        {PlatformIOS && (
          <View
            style={tw.style(
              `${FRIDGE_COLOR} shadow-lg rounded-bl-md w-[9%] border-t border-l border-b`,
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
              `w-[3%] h-full ${FRIDGE_COLOR} shadow-lg border-r border-t border-b rounded-r-md`,
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
              } rounded-t-md absolute w-[44%] h-full border border-b-0 border-l ${FRIDGE_COLOR} shadow-lg`,
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
              } rounded-tl-md absolute  w-[52%] border ${FRIDGE_COLOR} shadow-lg`,
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
