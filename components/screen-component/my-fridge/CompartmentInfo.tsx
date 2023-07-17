import { View } from 'react-native';
import { Text } from '../../native-component';
import { Space } from '../../../constant/fridgeInfo';
import { BLUE, DEEP_YELLOW } from '../../../constant/colors';
import { scaleH } from '../../../util';
import Icon from '../../native-component/Icon';
import tw from 'twrnc';
import useGetFoodList from '../../../hooks/useGetFoodList';
import useExpiredFoods from '../../../hooks/useExpiredFoods';
import { FontGmarketSansBold } from '../../../constant/fonts';

export default function CompartmentInfo({ space }: { space: Space }) {
  const { getFoodList } = useGetFoodList();
  const { filterExpiredFoods } = useExpiredFoods();

  const compartmentInfo = [
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
    <View style={tw`absolute top-0 z-10 p-[${scaleH(14)}px] h-full w-full`}>
      {/* 냉장고 칸 이름 */}
      <View
        style={tw`border-b border-slate-400 mb-3 pt-1 pb-2 flex-row items-center gap-1`}
      >
        <Icon
          name='information'
          type='MaterialCommunityIcons'
          size={16}
          color={space.includes('냉동') ? BLUE : DEEP_YELLOW}
        />
        <Text style={tw`text-slate-600`}>{space}</Text>
      </View>
      {/* 냉장고 칸 정보 */}
      <View style={tw`gap-4 flex-1`}>
        {compartmentInfo.map(({ name, foodList, activeColor }) => (
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
      {/* 들어가기 버튼 */}
      <View
        style={tw`flex-row items-center self-end border border-slate-300 px-3.5 py-1.5 rounded-full bg-amber-300`}
      >
        <Text
          fontSize={14}
          style={tw.style(`text-blue-700`, FontGmarketSansBold)}
        >
          들어가기
        </Text>
        <Icon name='enter' type='Ionicons' size={16} color={BLUE} />
      </View>
    </View>
  );
}
