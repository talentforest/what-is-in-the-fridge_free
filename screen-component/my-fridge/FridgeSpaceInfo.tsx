import { View } from 'react-native';
import { Text } from '../../components/common/native-component';
import { Space } from '../../constant/fridgeInfo';
import { FontGmarketSansBold } from '../../constant/fonts';
import { GRAY } from '../../constant/colors';
import { useGetFoodList } from '../../hooks';

import Icon from '../../components/common/native-component/Icon';
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
      foodList: (space: Space) => getFoodList('fridgeFoods', space),
    },
    {
      name: '소비기한 주의',
      foodList: (space: Space) => getFoodList('expiredFoods', space),
    },
  ];

  return (
    <View style={tw`h-full p-2 bg-white rounded-lg`}>
      {/* 냉장고 공간 이름 */}
      <View
        style={tw`border-b border-slate-300 pb-1 mb-2 flex-row justify-between items-center`}
      >
        <View style={tw`flex-row items-center gap-1.5`}>
          <Icon name='info' type='Feather' size={15} color={GRAY} />
          <Text style={tw`text-slate-600 text-[15px] pt-0.5`}>{space}</Text>
        </View>
      </View>

      {/* 냉장고 공간 정보 */}
      <View style={tw`flex-1`}>
        {spaceInfo.map(({ name, foodList }) => (
          <View key={name} style={tw`flex-row items-center justify-between`}>
            <Text
              style={tw`text-[13px] ${getColor(foodList(space).length, name)}`}
            >
              {name}
            </Text>
            <Text
              style={tw.style(
                `text-[13px] ${getColor(foodList(space).length, name)} `,
                FontGmarketSansBold
              )}
            >
              {foodList(space).length}개
            </Text>
          </View>
        ))}
      </View>
      <View style={tw`self-end flex-row items-center -mb-1`}>
        <Text style={tw`text-[13px] text-slate-500`}>들어가기</Text>
        <Icon name='chevron-right' type='Feather' size={16} color={GRAY} />
      </View>
    </View>
  );
}
