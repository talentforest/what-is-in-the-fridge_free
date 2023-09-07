import { View } from 'react-native';
import { Text } from '../../components/common/native-component';
import { Food } from '../../constant/foods';
import { cutLetter } from '../../util';
import { GRAY } from '../../constant/colors';

import SectionContainer from './SectionContainer';
import LeftDay from '../../components/common/LeftDay';
import Icon from '../../components/common/native-component/Icon';
import EmptySign from '../../components/common/EmptySign';
import tw from 'twrnc';

interface Props {
  foodList: Food[];
}

const MAX_NUM = 4;

export default function ExpiredFoodSection({ foodList }: Props) {
  return (
    <SectionContainer
      title='유통기한 주의 식료품'
      message='빨리 먹어야 하는 식료품을 확인할 수 있어요.'
      screen='ExpiredFoods'
    >
      {foodList.length ? (
        <View style={tw`min-h-30 -mx-2 p-2 gap-1.5`}>
          {foodList.slice(0, MAX_NUM).map((food) => (
            <View
              style={tw`shadow-lg gap-1 flex-row items-center justify-between border border-slate-300 bg-white py-2 px-4 rounded-lg`}
              key={food.id}
            >
              <Text style={tw`flex-1`}>{cutLetter(food.name, 16)}</Text>
              <LeftDay expiredDate={food.expiredDate} size={15} mark />
            </View>
          ))}
          {foodList.length > MAX_NUM && (
            <View style={tw` self-center`}>
              <Icon
                name='more-horizontal'
                type='Feather'
                size={30}
                color={GRAY}
              />
            </View>
          )}
        </View>
      ) : (
        <View
          style={tw`items-center h-40 my-2 border border-slate-300 rounded-xl bg-white justify-center flex-1`}
        >
          <EmptySign message='유통기한 주의 식료품이 없습니다.' />
        </View>
      )}
    </SectionContainer>
  );
}
