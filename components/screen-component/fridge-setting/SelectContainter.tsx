import { View } from 'react-native';
import { Text } from '../../native-component';
import { scaleH } from '../../../util';
import { ReactNode } from 'react';
import tw from 'twrnc';
import Icon from '../../native-component/Icon';

type FridgeSettingTitle =
  | '나의 냉장고 타입'
  | '냉동실 위치'
  | '각 공간의 칸 개수'
  | '냉장고 결과';

interface Props {
  title: FridgeSettingTitle;
  children: ReactNode;
}

export default function SelectContainter({ title, children }: Props) {
  return (
    <View style={tw`mb-[${scaleH(26)}px]`}>
      <Text
        style={tw`${
          title === '냉장고 결과' ? 'text-indigo-600' : 'text-slate-600'
        } pb-2`}
      >
        {title === '냉장고 결과' && (
          <Icon name='fridge' type='MaterialCommunityIcons' size={14} />
        )}{' '}
        {title}
      </Text>
      <View
        style={tw`gap-2 rounded-lg ${
          title === '각 공간의 칸 개수'
            ? ''
            : `p-[${scaleH(16)}px] bg-white border border-slate-300`
        }`}
      >
        {children}
      </View>
    </View>
  );
}
