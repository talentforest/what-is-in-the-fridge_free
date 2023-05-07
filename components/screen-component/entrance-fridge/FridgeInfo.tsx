import { View } from 'react-native';
import { Text } from '../../native-component';
import { useSelector } from '../../../redux/hook';
import tw from 'twrnc';
import useExpiredFood from '../../../hooks/useExpiredFoods';

export default function FridgeInfo() {
  const { fridgeFoods, freezerFoods } = useSelector((state) => state.foodsList);
  const { allExpiredFoods } = useExpiredFood();

  return (
    <View
      style={tw`my-4 p-4 gap-5 rounded-lg bg-white border-slate-400 border`}
    >
      <View style={tw`flex-row items-center justify-between`}>
        <Text styletw='text-center text-gray-600'>냉장고 식료품 총 개수</Text>
        <Text styletw='text-center text-indigo-600'>
          {fridgeFoods.length + freezerFoods.length}개
        </Text>
      </View>
      <View style={tw`flex-row items-center justify-between`}>
        <Text styletw='text-center text-gray-600'>
          유통기한이 임박한 식료품 총 개수
        </Text>
        <Text styletw='text-center text-indigo-600'>
          {allExpiredFoods.length}개
        </Text>
      </View>
    </View>
  );
}
