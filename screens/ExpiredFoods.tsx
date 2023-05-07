import { View } from 'react-native';
import { Text } from '../components/native-component';
import tw from 'twrnc';
import useExpiredFood from '../hooks/useExpiredFoods';
import FoodTagList from '../components/common/FoodTagList';

export default function ExpiredFoods() {
  const { expiredFridgeFoods, expiredFreezerFoods } = useExpiredFood();

  return (
    <View style={tw`flex-1 bg-indigo-50 p-4 gap-1`}>
      <Text styletw='mb-1 text-slate-600'>유통기한 3일 이내 식료품</Text>
      <FoodTagList foods={expiredFridgeFoods} />
      <FoodTagList foods={expiredFreezerFoods} />
    </View>
  );
}
