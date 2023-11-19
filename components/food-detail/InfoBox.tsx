import { View } from 'react-native';
import { Text } from '../common/native-component';
import { FormLabelType } from '../../constant/formInfo';
import { MEDIUM_GRAY } from '../../constant/colors';
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
      style={tw`py-2 flex-row items-start border-slate-300 ${
        label === '카테고리' ? '' : 'border-t'
      }`}
    >
      {/* 표 제목 */}
      <View style={tw`flex-row gap-1 items-center pr-3 w-24`}>
        <View style={tw`w-5.5 items-center`}>
          <Icon type='Octicons' name={iconName} size={14} color={MEDIUM_GRAY} />
        </View>
        <Text style={tw.style(`text-slate-500`, { letterSpacing: 0 })}>
          {label} :
        </Text>
      </View>

      {/* 표 내용 */}
      <View style={tw`flex-1 pr-2`}>{children}</View>
    </View>
  );
}
