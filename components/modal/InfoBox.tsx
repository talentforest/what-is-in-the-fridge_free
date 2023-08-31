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
      style={tw`gap-1 py-4 flex-row items-start ${
        label === '유통기한' ? '' : 'border-b'
      } border-slate-300`}
    >
      {/* 표 제목 */}
      <View style={tw`flex-row gap-1 mr-2 items-center`}>
        <Icon
          type='MaterialCommunityIcons'
          name={iconName}
          size={16}
          color={GRAY}
        />
        <Text style={tw`text-slate-500 text-base`}>{label} :</Text>
      </View>

      {/* 표 내용 */}
      <View style={tw`flex-row items-center gap-0.5`}>{children}</View>
    </View>
  );
}
