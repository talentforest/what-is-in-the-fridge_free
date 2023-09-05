import { View } from 'react-native';
import { Food } from '../../constant/foods';
import { cutLetter } from '../../util';
import { Text } from '../../components/common/native-component';
import tw from 'twrnc';

interface Props {
  food: Food;
}

export default function FoodTagBox({ food }: Props) {
  return (
    <View
      key={food.id}
      style={tw`shadow-lg py-1 px-2.5 bg-white border border-slate-300 gap-1 justify-center items-center flex-row rounded-lg`}
    >
      <Text style={tw`text-center text-slate-900`}>
        {cutLetter(food.name, 10)}
      </Text>
    </View>
  );
}
