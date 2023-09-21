import { View } from 'react-native';
import { Text } from '../common/native-component';
import { FormLabelType } from '../../constant/formInfo';
import { GRAY } from '../../constant/colors';
import { ReactNode } from 'react';

import Icon from '../common/native-component/Icon';
import tw from 'twrnc';

interface Props {
  label: FormLabelType;
  iconName: string;
  children: ReactNode;
}

export default function InfoBox({ label, iconName, children }: Props) {
  return (
    <View
      style={tw`gap-1 py-2.5 flex-row items-start border-slate-300 ${
        label === '카테고리' ? '' : 'border-t'
      }`}
    >
      {/* 표 제목 */}
      <View style={tw`flex-row gap-1 mr-1 items-center w-22`}>
        <Icon
          type='MaterialCommunityIcons'
          name={iconName}
          size={16}
          color={GRAY}
        />
        <Text style={tw`text-slate-500 text-[15px]`}>{label} :</Text>
      </View>

      {/* 표 내용 */}
      <View>{children}</View>
    </View>
  );
}
