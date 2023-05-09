import { View } from 'react-native';
import { Text } from '../components/native-component';
import tw from 'twrnc';
import useExpiredFood from '../hooks/useExpiredFoods';
import FoodTagList from '../components/common/FoodTagList';

export default function ExpiredFoods() {
  const {
    threeDaysLeftFreezerFoods,
    threeDaysLeftFridgeFoods,
    expiredFreezerFoods,
    expiredFridgeFoods,
  } = useExpiredFood();

  return (
    <View style={tw`flex-1 bg-indigo-50 p-4 gap-1`}>
      <Text styletw='mb-1 text-slate-600'>유통기한이 지난 식료품</Text>
      <Text styletw='mt-4 text-indigo-600'>냉장실</Text>
      <FoodTagList foods={expiredFridgeFoods} />
      <Text styletw='mt-4 text-indigo-600'>냉동실</Text>
      <FoodTagList foods={expiredFreezerFoods} />
      <Text styletw='mt-8 mb-1 text-slate-600'>유통기한 3일 이내 식료품</Text>
      <Text styletw='mt-4 text-indigo-600'>냉장실</Text>
      <FoodTagList foods={threeDaysLeftFridgeFoods} />
      <Text styletw='mt-4 text-indigo-600'>냉동실</Text>
      <FoodTagList foods={threeDaysLeftFreezerFoods} />
    </View>
  );
}
