import { View } from 'react-native';
import { Text } from '../native-component';
import { Food } from '../../constant/foods';
import FoodTag from './FoodTag';
import tw from 'twrnc';

interface Props {
  foods: Food[];
}

export default function FoodTagList({ foods }: Props) {
  return (
    <View style={tw`min-h-20 rounded-lg mt-3`}>
      {foods.length !== 0 ? (
        <View style={tw`flex-row flex-wrap gap-1.5 mb-8`}>
          {foods.map((food) => (
            <FoodTag key={food.id} food={food} />
          ))}
        </View>
      ) : (
        <View style={tw`flex-1 justify-center items-center`}>
          <Text styletw='text-sm text-slate-500'>아직 정보가 없습니다.</Text>
        </View>
      )}
    </View>
  );
}
