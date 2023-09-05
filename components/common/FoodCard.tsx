import { View } from 'react-native';
import { Text, TouchableOpacity } from './native-component';
import { cutLetter } from '../../util';
import { Food } from '../../constant/foods';
import { useNavigation } from '@react-navigation/native';
import { NavigateProp } from '../../navigation/Navigation';
import { LIGHT_BLUE } from '../../constant/colors';

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
        `shadow-md border border-slate-100 bg-white p-2.5 pb-2 items-center justify-center w-25 h-full rounded-xl`
      )}
    >
      <CategoryImageIcon kind='icon' category={food.category} size={18} />
      <View style={tw`flex-1 pt-1 items-center justify-center`}>
        <Text
          style={tw.style(`text-center text-slate-800`, {
            lineHeight: 22,
          })}
        >
          {cutLetter(food.name, 8)}
        </Text>
      </View>
      <IndicatorExist food={food} />
    </TouchableOpacity>
  );
}
