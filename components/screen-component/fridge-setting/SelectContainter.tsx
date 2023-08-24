import { View } from 'react-native';
import { Text } from '../../native-component';
import { scaleH } from '../../../util';
import { ReactNode } from 'react';
import tw from 'twrnc';
import Icon from '../../native-component/Icon';
import { BLUE, GRAY } from '../../../constant/colors';

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
    <View style={tw`mb-[${scaleH(26)}px]`}>
      {title === '나의 냉장고 모습' ? (
        <View
          style={tw`border border-slate-300 bg-amber-200 mb-1 justify-center items-center py-2 rounded-lg`}
        >
          <Text style={tw`text-blue-600`}>{title}</Text>
        </View>
      ) : (
        <View style={tw`flex-row items-center gap-1 pb-2`}>
          <Icon name='settings-sharp' type='Ionicons' color={GRAY} size={14} />
          <Text style={tw`text-slate-600`}>{title}</Text>
        </View>
      )}

      <View
        style={tw`gap-2 rounded-lg ${
          title === '각 공간의 칸 개수'
            ? ''
            : `p-[${scaleH(12)}px] bg-white border border-slate-300`
        }`}
      >
        {children}
      </View>
    </View>
  );
}
