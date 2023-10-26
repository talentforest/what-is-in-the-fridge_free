import { View, useWindowDimensions } from 'react-native';
import { Food } from '../../constant/foodInfo';

import SectionContainer from './SectionContainer';
import FoodCard from '../../components/common/FoodCard';
import EmptySign from '../../components/common/EmptySign';
import ShowMoreBtnBox from '../../components/buttons/ShowMoreBtnBox';
import tw from 'twrnc';

interface Props {
  foodList: Food[];
}

const MAX_NUM = 7;

export default function FavoriteFoodSection({ foodList }: Props) {
  const { width } = useWindowDimensions();

  const cardWidth = (width - 52) / 4;

  return (
    <SectionContainer
      title='자주 먹는 식료품'
      message='장을 볼 때 어떤 식료품이 없는지 참고할 수 있어요.'
      screen='FavoriteFoods'
      foodsLength={foodList.length}
    >
      {foodList.length ? (
        <View style={tw`-mx-1 px-1 justify-center items-center`}>
          <View style={tw`flex-wrap flex-row my-2.5 gap-1.5 justify-center`}>
            {foodList.slice(-MAX_NUM).map((food) => (
              <FoodCard key={food.id} food={food} width={cardWidth} />
            ))}

            {foodList.length >= MAX_NUM && <ShowMoreBtnBox width={cardWidth} />}
          </View>
        </View>
      ) : (
        <View
          style={tw`shadow-lg items-center my-2 h-40 border border-slate-300 rounded-xl bg-white justify-center flex-1`}
        >
          <EmptySign message='자주 먹는 식료품이 없어요.' />
        </View>
      )}
    </SectionContainer>
  );
}
