import { View } from 'react-native';
import { Food } from '../../constant/foodInfo';
import { useState } from 'react';

import SectionContainer from './SectionContainer';
import FoodTagBox from '../../components/common/FoodTagBox';
import MoreOpenBtn from '../../components/buttons/MoreOpenBtn';
import tw from 'twrnc';

interface Props {
  foodList: Food[];
}

const FOLDED_MAX_NUM = 10;

export default function ShoppingListSection({ foodList }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const foldedFoods = foodList.slice(0, FOLDED_MAX_NUM);

  return (
    <SectionContainer
      title='장보기 식료품'
      message='장보기 식료품을 간편하게 관리하세요.'
      screen='ShoppingList'
      foodsLength={foodList.length}
    >
      <View style={tw` flex-row gap-1 py-2 flex-wrap items-center`}>
        {foldedFoods.map((food) => (
          <FoodTagBox key={food.id} food={food} />
        ))}

        {isOpen &&
          foodList
            .slice(FOLDED_MAX_NUM)
            .map((food) => <FoodTagBox key={food.id} food={food} />)}

        {foodList.length > FOLDED_MAX_NUM && (
          <MoreOpenBtn isOpen={isOpen} setIsOpen={setIsOpen} />
        )}
      </View>
    </SectionContainer>
  );
}
