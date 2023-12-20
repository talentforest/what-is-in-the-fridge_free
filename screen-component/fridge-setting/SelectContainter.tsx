import { View } from 'react-native';
import { Text } from '../../components/common/native-component';
import { ReactNode } from 'react';
import { shadowStyle } from '../../constant/shadowStyle';
import tw from 'twrnc';

type FridgeSettingTitle =
  | '나의 냉장고 타입'
  | '냉동실 위치'
  | '각 공간의 칸 개수'
  | '나의 냉장고 모습';

interface Props {
  title: FridgeSettingTitle;
  children: ReactNode;
}

export default function SelectContainter({ title, children }: Props) {
  return (
    <View style={tw`mb-7 px-4`}>
      <View style={tw`flex-row items-center gap-1 pb-0.5 mb-1`}>
        <Text fontSize={16} style={tw`text-slate-700`}>
          {title}
        </Text>
      </View>

      <View
        style={tw.style(
          `rounded-xl ${
            title === '각 공간의 칸 개수'
              ? 'gap-1.5'
              : `px-3.5 py-1 bg-white border border-slate-200`
          }`,
          title === '각 공간의 칸 개수' ? null : shadowStyle(3)
        )}
      >
        {children}
      </View>
    </View>
  );
}
