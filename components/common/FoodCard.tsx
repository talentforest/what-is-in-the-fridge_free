import { View } from 'react-native';
import { Text, TouchableOpacity } from './native-component';
import { DEVICE_WIDTH, cutLetter } from '../../util';
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
        `border border-slate-300 bg-white pt-2.5 px-1.5 pb-1.5 items-center justify-center 
        w-[${DEVICE_WIDTH / 3 - 18}px] h-32 rounded-lg`,
        shadowStyle(5)
      )}
    >
      <CategoryIcon category={food.category} size={16} />
      <View style={tw`flex-1 mt-1 items-center justify-center`}>
        <Text style={tw.style(`text-center text-slate-800`)}>
          {cutLetter(food.name, 9)}
        </Text>
      </View>

      <IndicatorExist name={food.name} />
    </TouchableOpacity>
  );
}
