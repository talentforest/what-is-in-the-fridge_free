import { View } from 'react-native';
import { Food } from '../../constant/foodInfo';
import { Text } from '../../components/common/native-component';

import SectionContainer from './SectionContainer';
import FoodTagBox from '../../components/common/FoodTagBox';
import tw from 'twrnc';

interface Props {
  foodList: Food[];
}

const MAX_NUM = 20;

export default function ShoppingListSection({ foodList }: Props) {
  const list = foodList.slice(0, MAX_NUM);

  return (
    <SectionContainer
      title='장보기 식료품'
      message='장봐야하는 식료품을 간단하게 관리하세요.'
      screen='ShoppingList'
      foodsLength={foodList.length}
    >
      <View style={tw`flex-row gap-1 py-2 flex-wrap items-center`}>
        {list.map((food) => (
          <FoodTagBox key={food.id} food={food} />
        ))}

        {foodList.length > MAX_NUM && foodList.length > MAX_NUM && (
          <Text style={tw`text-[15px] text-blue-600 mx-1`}>
            + {foodList.length - MAX_NUM}개
          </Text>
        )}
      </View>
    </SectionContainer>
  );
}
