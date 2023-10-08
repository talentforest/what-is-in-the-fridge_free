import { View } from 'react-native';
import {
  Text,
  TouchableOpacity,
} from '../../components/common/native-component';
import { Food } from '../../constant/foodInfo';
import { GRAY } from '../../constant/colors';
import { useNavigation } from '@react-navigation/native';
import { NavigateProp } from '../../navigation/Navigation';
import { shadowStyle } from '../../constant/shadowStyle';

import SectionContainer from './SectionContainer';
import LeftDay from '../../components/common/LeftDay';
import Icon from '../../components/common/native-component/Icon';
import ExpiredExclamation from '../../components/common/ExpiredExclamation';
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
              `h-10.5 gap-1 flex-row items-center justify-between border border-slate-300 bg-white pr-4 pl-3 rounded-lg`,
              shadowStyle(3)
            )}
            key={food.id}
            onPress={() => navigation.navigate('ExpiredFoods')}
          >
            <ExpiredExclamation expiredDate={food.expiredDate} />

            <Text
              style={tw.style(`flex-1`)}
              numberOfLines={1}
              ellipsizeMode='tail'
            >
              {food.name}
            </Text>
            <View style={tw`ml-2 w-21`}>
              <LeftDay expiredDate={food.expiredDate} size={15} />
            </View>
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
