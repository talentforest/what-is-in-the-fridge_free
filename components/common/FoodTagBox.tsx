import { Food } from '../../constant/foodInfo';
import { cutLetter } from '../../util';
import { Text, TouchableOpacity } from './native-component';
import { useNavigation } from '@react-navigation/native';
import { NavigateProp } from '../../navigation/Navigation';
import tw from 'twrnc';

interface Props {
  food: Food;
}

export default function FoodTagBox({ food }: Props) {
  const navigation = useNavigation<NavigateProp>();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ShoppingList')}
      key={food.id}
      style={tw`shadow-lg py-1 px-3 bg-white border border-slate-300 gap-1 justify-center items-center flex-row rounded-lg`}
    >
      <Text style={tw`text-center text-slate-900`}>
        {cutLetter(food.name, 14)}
      </Text>
    </TouchableOpacity>
  );
}
