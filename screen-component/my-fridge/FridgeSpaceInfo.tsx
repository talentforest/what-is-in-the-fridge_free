import { View } from 'react-native';
import { Text } from '../../components/common/native-component';
import { Space } from '../../constant/fridgeInfo';
import { FontGmarketSansBold } from '../../constant/fonts';
import { GRAY } from '../../constant/colors';
import { useGetFoodList } from '../../hooks';

import Icon from '../../components/common/native-component/Icon';
import SeeMoreBtn from '../../components/buttons/SeeMoreBtn';
import tw from 'twrnc';

interface Props {
  space: Space;
  compartmentsLength: number;
}

export default function FridgeSpaceInfo({ space, compartmentsLength }: Props) {
  const { getFoodList } = useGetFoodList();

  const getColor = (listLength: number, name: string) => {
    const activeColor = name === '총 식료품' ? 'text-blue-600' : 'text-red-600';
    const inActiveColor = 'text-slate-400';
    return listLength ? activeColor : inActiveColor;
  };

  const spaceInfo = [
    {
      name: '총 식료품',
      foodList: (space: Space) => getFoodList('allFoods', space),
    },
    {
      name: '유통기한 주의',
      foodList: (space: Space) => getFoodList('expiredFoods', space),
    },
  ];

  return (
    <View style={tw`h-full p-1 py-2 bg-white rounded-lg`}>
      {/* 냉장고 공간 이름 */}
      <View
        style={tw`border-b border-slate-600 pb-2 mb-3 flex-row justify-between items-center gap-1`}
      >
        <View style={tw`flex-row items-center gap-1`}>
          <Icon name='caretright' type='AntDesign' size={12} color={GRAY} />
          <Text style={tw`text-slate-600`}>{space}</Text>
        </View>
        <Text style={tw`text-slate-600`}>{compartmentsLength}칸</Text>
      </View>

      {/* 냉장고 공간 정보 */}
      <View style={tw`gap-1 flex-1`}>
        {spaceInfo.map(({ name, foodList }) => (
          <View key={name} style={tw`flex-row items-center justify-between`}>
            <Text style={tw`text-sm ${getColor(foodList(space).length, name)}`}>
              {name}
            </Text>
            <Text
              style={tw.style(
                `text-sm ${getColor(foodList(space).length, name)} `,
                FontGmarketSansBold
              )}
            >
              {foodList(space).length}개
            </Text>
          </View>
        ))}
      </View>
      <SeeMoreBtn />
    </View>
  );
}
