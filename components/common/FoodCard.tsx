import { View } from 'react-native';
import { Text, TouchableOpacity } from './native-component';
import { DEVICE_WIDTH } from '../../util';
import { Food } from '../../constant/foodInfo';
import { useNavigation } from '@react-navigation/native';
import { NavigateProp } from '../../navigation/Navigation';
import { shadowStyle } from '../../constant/shadowStyle';

import IndicatorExist from './IndicatorExist';
import CategoryIcon from './CategoryIcon';
import tw from 'twrnc';

interface Props {
  food: Food;
}

export default function FoodCard({ food }: Props) {
  const navigation = useNavigation<NavigateProp>();

  return (
    <TouchableOpacity
      key={food.id}
      onPress={() => navigation.navigate('FavoriteFoods')}
      style={tw.style(
        `border border-slate-300 bg-white pt-2 px-1.5 pb-1 items-center justify-center 
        w-[${DEVICE_WIDTH / 4 - 13}px] h-28 rounded-lg`,
        shadowStyle(5)
      )}
    >
      <CategoryIcon category={food.category} size={17} />
      <View style={tw`mt-1.3 items-center justify-center h-13.5`}>
        <Text
          numberOfLines={2}
          ellipsizeMode='tail'
          style={tw`text-center text-slate-800`}
        >
          {food.name}
        </Text>
      </View>

      <IndicatorExist name={food.name} />
    </TouchableOpacity>
  );
}
