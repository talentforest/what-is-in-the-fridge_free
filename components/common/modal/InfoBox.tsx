import { View } from 'react-native';
import { Text } from '../../native-component';
import { FormLabel } from '../../../constant/formInfo';
import { getFormattedDate } from '../../../util';
import { GRAY, INDIGO } from '../../../constant/colors';
import tw from 'twrnc';
import LeftDay from '../LeftDay';
import Icon from '../../native-component/Icon';

interface Props {
  label: FormLabel;
  info: string;
  favorite?: boolean;
  iconName: string;
}

export default function InfoBox({ label, info, favorite, iconName }: Props) {
  const dateItem = label === '구매날짜' || label === '유통기한';

  return (
    <View
      style={tw`gap-1 py-4 flex-row items-start ${
        label === '유통기한' ? '' : 'border-b'
      } border-slate-300`}
    >
      {/* 표 제목 */}
      <View style={tw`flex-row gap-1 w-[31%] items-center`}>
        <Icon type='MaterialCommunityIcons' name={iconName} color={GRAY} />
        <Text style={tw`text-slate-500 `}>{label} :</Text>
      </View>

      {/* 표 내용 */}
      <View style={tw`gap-1 flex-row items-end flex-wrap flex-1`}>
        <Text style={tw`text-slate-800`}>
          {dateItem ? getFormattedDate(info, 'YYYY년 MM월 DD일') : info}
        </Text>
        {label === '식료품 이름' && favorite && (
          <View style={tw`flex-row items-center gap-0.5`}>
            <Icon
              type='MaterialCommunityIcons'
              name='tag-heart'
              color={INDIGO}
              size={13}
            />
            <Text style={tw`text-indigo-500`} fontSize={12}>
              자주 먹는 식품
            </Text>
          </View>
        )}
        {label === '유통기한' && <LeftDay expiredDate={info} />}
      </View>
    </View>
  );
}
