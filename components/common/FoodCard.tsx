import { View } from 'react-native';
import { Text, TouchableOpacity } from './native-component';
import { DEVICE_WIDTH, cutLetter } from '../../util';
import { Food } from '../../constant/foodInfo';
import { useNavigation } from '@react-navigation/native';
import { NavigateProp } from '../../navigation/Navigation';

import IndicatorExist from './IndicatorExist';
import CategoryImageIcon from './CategoryImageIcon';
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
        `shadow-lg border border-slate-100 bg-white pt-2.5 px-2 pb-1.5 items-center justify-center 
        w-[${DEVICE_WIDTH / 3 - 18}px] h-30 rounded-lg`
      )}
    >
      <CategoryImageIcon kind='icon' category={food.category} size={17} />
      <View style={tw`flex-1 items-center justify-center`}>
        <Text style={tw.style(`text-center text-slate-800`)}>
          {cutLetter(food.name, 12)}
        </Text>
      </View>

      <IndicatorExist name={food.name} />
    </TouchableOpacity>
  );
}
