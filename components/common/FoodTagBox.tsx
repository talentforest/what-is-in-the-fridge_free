import { Food } from '../../constant/foodInfo';
import { cutLetter } from '../../util';
import { Text, TouchableOpacity } from './native-component';
import { useNavigation } from '@react-navigation/native';
import { NavigateProp } from '../../navigation/Navigation';
import { shadowStyle } from '../../constant/shadowStyle';
import tw from 'twrnc';

interface Props {
  food: Food;
}

export default function FoodTagBox({ food }: Props) {
  const navigation = useNavigation<NavigateProp>();

  return food.name ? (
    <TouchableOpacity
      onPress={() => navigation.navigate('ShoppingList')}
      key={food.id}
      style={tw.style(
        `py-1 px-3 h-9 min-w-13 bg-white border border-slate-300 gap-1 justify-center items-center flex-row rounded-lg`,
        shadowStyle(5)
      )}
    >
      <Text style={tw`text-center text-slate-900`}>
        {cutLetter(food.name, 14)}
      </Text>
    </TouchableOpacity>
  ) : (
    <></>
  );
}
