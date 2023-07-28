import { View } from 'react-native';
import { Text } from '../../native-component';
import { FontGmarketSansBold } from '../../../constant/fonts';
import { Space } from '../../../constant/fridgeInfo';
import useGetFoodList from '../../../hooks/useGetFoodList';
import useExpiredFoods from '../../../hooks/useExpiredFoods';
import tw from 'twrnc';

export default function SpaceDetailInfo({ space }: { space: Space }) {
  const { getFoodList } = useGetFoodList();
  const { filterExpiredFoods } = useExpiredFoods();

  const spaceInfo = [
    {
      name: '총 식료품',
      foodList: (space: Space) => getFoodList(space),
      activeColor: 'text-blue-600',
    },
    {
      name: '유통기한 주의',
      foodList: (space: Space) => filterExpiredFoods(space),
      activeColor: 'text-red-500',
    },
  ];

  const getColor = (listLength: number, activeColor: string) => {
    const inActiveColor = 'text-slate-500';
    return listLength ? activeColor : inActiveColor;
  };

  return (
    <View style={tw`gap-4 flex-1`}>
      {spaceInfo.map(({ name, foodList, activeColor }) => (
        <View key={name} style={tw`flex-row items-center justify-between`}>
          <Text style={tw`${getColor(foodList(space).length, activeColor)}`}>
            {name}
          </Text>
          <Text
            style={tw.style(
              `${getColor(foodList(space).length, activeColor)}`,
              FontGmarketSansBold
            )}
          >
            {foodList(space).length}개
          </Text>
        </View>
      ))}
    </View>
  );
}
