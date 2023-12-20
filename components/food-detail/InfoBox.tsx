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
      style={tw`py-2.5 flex-row items-center border-slate-300 ${
        label === '카테고리' ? '' : 'border-t'
      }`}
    >
      {/* 표 제목 */}
      <View
        style={tw`${
          label === '메모' ? 'self-start mt-0.5' : ''
        } flex-row gap-1 items-center w-23`}
      >
        <View style={tw`w-5.5 items-center`}>
          <Icon type='Octicons' name={iconName} size={14} color={MEDIUM_GRAY} />
        </View>
        <Text fontSize={16} style={tw.style(`text-slate-500`)}>
          {label} :
        </Text>
      </View>

      {/* 표 내용 */}
      <View style={tw`flex-1 pr-1`}>{children}</View>
    </View>
  );
}
