import { View } from 'react-native';
import { Text } from '../../native-component';
import { FormLabel } from '../../../constant/formInfo';
import { getFormattedDate } from '../../../util';
import { GREEN, ORANGE_RED } from '../../../constant/colors';
import tw from 'twrnc';
import LeftDay from '../LeftDay';
import Icon from '../../native-component/Icon';

interface Props {
  label: FormLabel;
  info?: string;
  favorite?: boolean;
}

export default function InfoBox({ label, info, favorite }: Props) {
  const dateItem = label === '구매날짜' || label === '유통기한';

  return (
    <View
      style={tw`items-center gap-2 p-2.5 py-4 flex-row border-t border-slate-300`}
    >
      <Text style={tw`text-indigo-600`}>{label} : </Text>

      {info && (
        <View style={tw`gap-3 flex-row items-center flex-1`}>
          <Text style={tw`text-slate-800`}>
            {dateItem ? getFormattedDate(info, 'YYYY년 MM월 DD일') : info}
          </Text>
          {label === '유통기한' && <LeftDay expiredDate={info} />}
        </View>
      )}

      {!info && (
        <View style={tw`items-center flex-row gap-0.5`}>
          <Icon
            type='AntDesign'
            name={favorite ? 'checksquareo' : 'closesquareo'}
            color={favorite ? GREEN : ORANGE_RED}
          />
          <Text style={tw`${favorite ? 'text-green-700' : 'text-orange-600'}`}>
            {favorite ? '맞아요' : '아니에요'}
          </Text>
        </View>
      )}
    </View>
  );
}
