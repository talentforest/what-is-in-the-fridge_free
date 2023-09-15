import { View } from 'react-native';
import { Text } from '../../components/common/native-component';
import { ReactNode } from 'react';
import { GRAY } from '../../constant/colors';

import Icon from '../../components/common/native-component/Icon';
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
    <View style={tw`mb-8`}>
      <View style={tw`flex-row items-center gap-1 pb-0.5`}>
        <Icon name='settings-outline' type='Ionicons' color={GRAY} size={14} />
        <Text style={tw`text-slate-600 text-sm`}>{title}</Text>
      </View>

      <View
        style={tw`gap-2 rounded-lg ${
          title === '각 공간의 칸 개수'
            ? ''
            : `px-3.5 py-2 bg-white border border-slate-300`
        }`}
      >
        {children}
      </View>
    </View>
  );
}
