import { ScrollView, View } from 'react-native';
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
    <ScrollView style={tw`flex-1 bg-neutral-50 p-4 gap-1`}>
      <View style={tw`gap-2 mb-20`}>
        <Text styletw='text-indigo-600'>냉장실</Text>
        <FoodTagList
          foods={[...expiredFridgeFoods, ...threeDaysLeftFridgeFoods]}
        />
        <Text styletw='text-indigo-600'>냉동실</Text>
        <FoodTagList
          foods={[...expiredFreezerFoods, ...threeDaysLeftFreezerFoods]}
        />
      </View>
    </ScrollView>
  );
}
