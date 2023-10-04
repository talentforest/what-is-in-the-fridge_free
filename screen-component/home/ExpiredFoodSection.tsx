import { View } from 'react-native';
import {
  Text,
  TouchableOpacity,
} from '../../components/common/native-component';
import { Food } from '../../constant/foodInfo';
import { cutLetter, expired, getDiffDate } from '../../util';
import { GRAY } from '../../constant/colors';
import { useNavigation } from '@react-navigation/native';
import { NavigateProp } from '../../navigation/Navigation';
import { shadowStyle } from '../../constant/shadowStyle';

import SectionContainer from './SectionContainer';
import LeftDay from '../../components/common/LeftDay';
import Icon from '../../components/common/native-component/Icon';
import tw from 'twrnc';

interface Props {
  foodList: Food[];
}

const MAX_NUM = 6;

export default function ExpiredFoodSection({ foodList }: Props) {
  const navigation = useNavigation<NavigateProp>();

  return (
    <SectionContainer
      title='소비기한 주의 식료품'
      message='빨리 먹어야 하는 식료품을 확인하세요.'
      screen='ExpiredFoods'
      foodsLength={foodList.length}
    >
      <View style={tw`min-h-30 -mx-2 p-2 gap-1.5`}>
        {foodList.slice(0, MAX_NUM).map((food) => (
          <TouchableOpacity
            style={tw.style(
              `gap-1 flex-row items-center justify-between border border-slate-300 bg-white py-2 pr-4 pl-3 rounded-lg`,
              shadowStyle(3)
            )}
            key={food.id}
            onPress={() => navigation.navigate('ExpiredFoods')}
          >
            {expired(food.expiredDate) && (
              <Icon
                name='exclamation-thick'
                type='MaterialCommunityIcons'
                color='red'
              />
            )}

            {getDiffDate(food.expiredDate) === 0 && (
              <Icon
                name='exclamation-thick'
                type='MaterialCommunityIcons'
                color='amber'
              />
            )}

            <Text style={tw`flex-1`}>{cutLetter(food.name, 14)}</Text>
            <LeftDay expiredDate={food.expiredDate} size={15} />
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
