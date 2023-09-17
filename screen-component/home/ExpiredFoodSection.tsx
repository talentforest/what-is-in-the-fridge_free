import { View } from 'react-native';
import {
  Text,
  TouchableOpacity,
} from '../../components/common/native-component';
import { Food } from '../../constant/foodInfo';
import { cutLetter } from '../../util';
import { GRAY } from '../../constant/colors';

import SectionContainer from './SectionContainer';
import LeftDay from '../../components/common/LeftDay';
import Icon from '../../components/common/native-component/Icon';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { NavigateProp } from '../../navigation/Navigation';

interface Props {
  foodList: Food[];
}

const MAX_NUM = 4;

export default function ExpiredFoodSection({ foodList }: Props) {
  const navigation = useNavigation<NavigateProp>();
  return (
    <SectionContainer
      title='유통기한 주의 식료품'
      message='빨리 먹어야 하는 식료품을 확인할 수 있어요.'
      screen='ExpiredFoods'
      foodsLength={foodList.length}
    >
      <View style={tw`min-h-30 -mx-2 p-2 gap-1.5`}>
        {foodList.slice(0, MAX_NUM).map((food) => (
          <TouchableOpacity
            style={tw`shadow-lg gap-1 flex-row items-center justify-between border border-slate-300 bg-white py-2 px-4 rounded-lg`}
            key={food.id}
            onPress={() => navigation.navigate('ExpiredFoods')}
          >
            <Text style={tw`flex-1`}>{cutLetter(food.name, 16)}</Text>
            <LeftDay expiredDate={food.expiredDate} size={15} mark />
          </TouchableOpacity>
        ))}
        {foodList.length > MAX_NUM && (
          <View style={tw`self-center mt-2`}>
            <Icon name='more-vertical' type='Feather' size={25} color={GRAY} />
          </View>
        )}
      </View>
    </SectionContainer>
  );
}
