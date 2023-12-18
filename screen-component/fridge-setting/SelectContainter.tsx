import { View } from 'react-native';
import { Text } from '../../components/common/native-component';
import { ReactNode } from 'react';
import tw from 'twrnc';

type FridgeSettingTitle =
  | '나의 냉장고 타입'
  | '냉동실 위치'
  | '각 공간의 칸 개수'
  | '나의 냉장고 모습'
  | '내부 식료품 보기 설정';

interface Props {
  title: FridgeSettingTitle;
  children: ReactNode;
  icon?: string;
}

export default function SelectContainter({ title, children, icon }: Props) {
  return (
    <View style={tw`mb-6`}>
      <View style={tw`flex-row items-center gap-1 pb-0.5 mb-1`}>
        <Text fontSize={16} style={tw`text-slate-700`}>
          {title}
        </Text>
      </View>

      <View
        style={tw`rounded-xl ${
          title === '각 공간의 칸 개수' || title === '내부 식료품 보기 설정'
            ? 'gap-1.5'
            : `px-3.5 py-2.5 bg-white border border-slate-300`
        }`}
      >
        {children}
      </View>
    </View>
  );
}
