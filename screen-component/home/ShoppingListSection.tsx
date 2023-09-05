import { View } from 'react-native';
import { Food } from '../../constant/foods';
import { useState } from 'react';

import FoodTagBox from './FoodTagBox';
import MoreOpenBtn from '../../components/buttons/MoreOpenBtn';
import EmptySign from '../../components/common/EmptySign';
import HeaderTitle from './HeaderTitle';
import MessageBox from './MessageBox';
import tw from 'twrnc';

interface Props {
  foodList: Food[];
}

const FOLDED_MAX_NUM = 10;

export default function ShoppingListSection({ foodList }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const foldedFoods = foodList.slice(0, FOLDED_MAX_NUM);

  return (
    <View style={tw`flex-1`}>
      <HeaderTitle title='장보기 목록' screen='ShoppingList' />

      {foodList.length !== 0 ? (
        <View style={tw`flex-row gap-1 py-2 flex-wrap items-center`}>
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
      ) : (
        <View
          style={tw`items-center mb-2 h-40 border border-slate-300 rounded-xl bg-white justify-center flex-1`}
        >
          <EmptySign message='장봐야하는 식료품이 없어요.' />
        </View>
      )}

      <MessageBox desc='장보기 목록에서 쉽게 추가하고 관리할 수 있어요.' />
    </View>
  );
}
