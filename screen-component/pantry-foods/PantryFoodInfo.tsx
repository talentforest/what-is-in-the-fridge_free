import { View } from 'react-native';
import { Text } from '../../components/common/native-component';
import { getFormattedDate } from '../../util';
import { GRAY } from '../../constant/colors';

import Icon from '../../components/common/native-component/Icon';
import LeftDay from '../../components/common/LeftDay';
import tw from 'twrnc';

interface Props {
  title: '구매날짜' | '소비기한';
  date: string;
}

export default function PantryFoodInfo({ title, date }: Props) {
  return (
    <View style={tw`flex-row items-center gap-0.5 mt-0.5 -mb-0.5`}>
      <Icon
        name={title === '소비기한' ? 'calendar' : 'basket'}
        type='MaterialCommunityIcons'
        size={14}
        color={GRAY}
      />
      <Text style={tw`text-[13px] text-slate-500 mr-1`}>{title} :</Text>

      <Text style={tw`text-[13px] text-slate-500 mr-1`}>
        {getFormattedDate(date, 'YY.MM.DD')}
      </Text>

      {title === '소비기한' && (
        <LeftDay expiredDate={date} size={13} iconMark />
      )}
    </View>
  );
}
