import { View } from 'react-native';
import { Text } from '../../native-component';
import { Label } from '../form/Form';
import { getFormattedDate } from '../../../util';
import tw from 'twrnc';
import LeftDay from '../../common/LeftDay';

interface Props {
  label: Label;
  info?: string;
  favorite?: boolean;
}

export default function InfoBox({ label, info, favorite }: Props) {
  const dateItem = label === '구매날짜' || label === '유통기한';

  return (
    <View
      style={tw`items-center gap-2 p-2.5 flex-row border-b border-slate-300`}
    >
      <Text styletw='text-slate-600'>{label} : </Text>

      {info && (
        <View style={tw`gap-3 flex-row items-center flex-1`}>
          <Text styletw='text-indigo-600'>
            {dateItem ? getFormattedDate(info, 'YYYY년 MM월 DD일') : info}
          </Text>
          {label === '유통기한' && <LeftDay expiredDate={info} />}
        </View>
      )}

      {!info && (
        <Text styletw={`text-indigo-600`}>
          {favorite ? '맞아요' : '아니에요'}
        </Text>
      )}
    </View>
  );
}
