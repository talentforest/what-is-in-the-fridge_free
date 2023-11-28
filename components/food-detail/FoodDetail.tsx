import { View } from 'react-native';
import { Text } from '../common/native-component';
import { getFormattedDate } from '../../util';
import { comma } from '../../util/commaNotation';
import { useSelector } from '../../redux/hook';

import InfoBox from './InfoBox';
import LeftDayInfoBox from '../modal/LeftDayInfoBox';
import CategoryIcon from '../common/CategoryIcon';
import FoodDetailName from './FoodDetailName';
import tw from 'twrnc';

export default function FoodDetail() {
  const { formFood } = useSelector((state) => state.formFood);

  const {
    name,
    category,
    quantity,
    expiredDate,
    purchaseDate,
    memo, //
  } = formFood;

  return (
    <>
      <FoodDetailName name={name} />

      <View>
        <InfoBox iconName='apps' label='카테고리'>
          <View style={tw`flex-row items-center gap-1`}>
            <CategoryIcon category={category} size={16} />
            <Text>{category}</Text>
          </View>
        </InfoBox>

        <InfoBox iconName='calendar' label='소비기한'>
          <LeftDayInfoBox expiredDate={expiredDate} />
        </InfoBox>

        {purchaseDate !== '' && (
          <InfoBox iconName='calendar' label='구매날짜'>
            <Text style={tw`text-slate-800`}>
              {getFormattedDate(purchaseDate, 'YY.MM.DD')}
            </Text>
          </InfoBox>
        )}

        {quantity !== '' && (
          <InfoBox iconName='diff' label='수량'>
            <Text>{comma(quantity)}</Text>
          </InfoBox>
        )}

        {memo?.length >= 1 && (
          <InfoBox iconName='note' label='메모'>
            <View style={tw`max-h-18`}>
              <Text
                numberOfLines={3}
                ellipsizeMode='tail'
                style={tw`leading-5`}
              >
                {memo}
              </Text>
            </View>
          </InfoBox>
        )}
      </View>
    </>
  );
}
