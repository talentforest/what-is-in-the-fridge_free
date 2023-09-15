import { ScrollView, View } from 'react-native';
import { Food } from '../../constant/foodInfo';
import {
  Text,
  TouchableOpacity,
} from '../../components/common/native-component';
import { useNavigation } from '@react-navigation/native';
import { NavigateProp } from '../../navigation/Navigation';

import SectionContainer from './SectionContainer';
import Icon from '../../components/common/native-component/Icon';
import FoodCard from '../../components/common/FoodCard';
import EmptySign from '../../components/common/EmptySign';
import tw from 'twrnc';

interface Props {
  foodList: Food[];
}

const MAX_NUM = 5;

export default function FavoriteFoodSection({ foodList }: Props) {
  const navigation = useNavigation<NavigateProp>();

  return (
    <SectionContainer
      title='자주 먹는 식료품'
      message='장을 볼때 어떤 식료품이 없는지 참고할 수 있어요.'
      screen='FavoriteFoods'
      foodsLength={foodList.length}
    >
      {foodList.length ? (
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          style={tw`h-35 -mx-4`}
          contentContainerStyle={tw`gap-2 px-4 py-3 pt-2`}
        >
          {foodList.slice(0, MAX_NUM).map((food) => (
            <FoodCard key={food.id} food={food} />
          ))}

          {foodList.length > MAX_NUM && (
            <TouchableOpacity
              onPress={() => navigation.navigate('FavoriteFoods')}
              style={tw`w-15 mx-2 justify-center items-center gap-1`}
            >
              <Icon
                name='arrow-right-circle-outline'
                type='MaterialCommunityIcons'
                size={30}
                color={'#888'}
              />
              <Text style={tw`text-xs text-slate-600`}>더보기</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
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
