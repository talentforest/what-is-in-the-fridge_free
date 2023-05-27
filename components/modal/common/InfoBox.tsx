import { View } from 'react-native';
import { Text } from '../../native-component';
import { DEEP_INDIGO, INACTIVE_COLOR } from '../../../constant/colors';
import Icon from 'react-native-vector-icons/Octicons';
import tw from 'twrnc';
import { Label } from '../form/Form';

interface Props {
  label: Label;
  info?: string;
  favorite?: boolean;
  leftDays?: number;
}

export default function InfoBox({ label, info, favorite, leftDays }: Props) {
  return (
    <View style={tw`items-center gap-2 p-2.5 flex-row`}>
      <Text styletw='text-slate-600'>{label} : </Text>
      {info && (
        <View style={tw`gap-3 flex-row items-center flex-1`}>
          <Text styletw='text-indigo-600'>{info}</Text>
          {(leftDays || leftDays === 0) && label === '유통기한' && (
            <Text
              styletw={`${leftDays >= 0 ? 'text-green-600' : 'text-red-500'}`}
            >
              {leftDays >= 0
                ? `${leftDays}일 남음`
                : `${Math.abs(leftDays)}일 지남`}
            </Text>
          )}
        </View>
      )}
      {!info && (
        <View style={tw`flex-row items-center gap-1`}>
          <Icon
            name={favorite ? 'check-circle' : 'circle'}
            color={favorite ? DEEP_INDIGO : INACTIVE_COLOR}
            size={16}
          />
          <Text styletw={`text-indigo-600`}>
            {favorite ? '맞아요' : '아니에요'}
          </Text>
        </View>
      )}
    </View>
  );
}
