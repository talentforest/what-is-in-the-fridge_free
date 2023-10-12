import { View } from 'react-native';
import { ReactNode } from 'react';
import { FRIDGE_COLOR } from '../../constant/colors';
import tw from 'twrnc';

interface Props {
  children: ReactNode;
  routeFridgeSetting: boolean;
}

export default function IOSFridgeContainer({
  children,
  routeFridgeSetting,
}: Props) {
  return (
    <View style={tw`flex-1 h-full pb-2`}>
      {/* 냉장고 탑 */}
      <View
        style={tw`absolute w-full flex-row items-end
        ${routeFridgeSetting ? 'h-6' : 'h-10.5'}`}
      >
        {/* 탑 안쪽 */}
        <View
          style={tw.style(
            `${
              routeFridgeSetting
                ? 'left-2.5 top-4.5 w-[45%]'
                : 'left-4.8 -top-1 w-[43.5%]'
            } 
            ${FRIDGE_COLOR} rounded-t-md absolute h-full border border-b-0 border-l shadow-lg`,
            { transform: [{ skewX: '45deg' }] }
          )}
        />

        {/* 탑 문쪽 */}
        <View
          style={tw.style(
            `${
              routeFridgeSetting
                ? '-bottom-5 h-[32%] w-[50%]'
                : '-bottom-2 w-[50%] h-[26%]'
            } -right-1 rounded-t-md  absolute border ${FRIDGE_COLOR}`,
            {
              transform: [
                { skewX: '-50deg' },
                { skewY: '6deg' },
                { translateX: routeFridgeSetting ? 0 : 3 },
              ],
            }
          )}
        />
      </View>

      <View style={tw`flex-row flex-1 mt-9`}>
        {/* 냉장고 왼쪽 옆부분 */}
        <View
          style={tw.style(
            `${
              routeFridgeSetting
                ? 'mb-0.5 rounded-l-md'
                : 'mb-1.5 rounded-bl-md'
            }
            ${FRIDGE_COLOR} w-[12%] border-t border-l border-b`,
            {
              transform: [
                { skewY: '45deg' },
                { translateY: routeFridgeSetting ? -11 : -19 },
                { translateX: routeFridgeSetting ? 0 : 1.5 },
              ],
            }
          )}
        />

        {children}

        {/* 냉장고 오른쪽 옆부분 */}
        <View
          style={tw.style(
            `w-[3%] ${FRIDGE_COLOR} mb-0.5 border-r  border-b rounded-r-md`,
            {
              transform: [
                { skewY: '-33deg' },
                { translateY: routeFridgeSetting ? 4 : 13 },
              ],
            }
          )}
        />
      </View>
    </View>
  );
}
