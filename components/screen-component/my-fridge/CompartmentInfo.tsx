import { View } from 'react-native';
import { Text } from '../../native-component';
import { Space } from '../../../constant/fridgeInfo';
import { DEEP_BLUE, INDIGO, ORANGE_RED } from '../../../constant/colors';
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
      name: '식료품',
      icon: 'food',
      list: (space: Space) => getFoodList(space),
      color: INDIGO,
    },
    {
      name: '유통기한 주의',
      icon: 'fridge-industrial-alert',
      list: (space: Space) => filterExpiredFoods(space),
      color: ORANGE_RED,
    },
  ];

  return (
    <View style={tw`absolute top-0 z-10 p-[${scaleH(14)}px] h-full w-full`}>
      <View style={tw`pb-5`}>
        <Text
          style={tw`${
            space.includes('냉동') ? 'text-blue-600' : 'text-indigo-700'
          }`}
          fontSize={scaleH(16)}
        >
          {space}
        </Text>
      </View>
      <View style={tw`gap-3 mb-5 flex-1`}>
        {compartmentInfo.map(({ name, icon, list, color }) => (
          <View key={name} style={tw`gap-1 mb-1 flex-row`}>
            <Icon
              type='MaterialCommunityIcons'
              name={icon}
              size={16}
              color={`${!!list(space as Space).length ? color : '#fff'}`}
            />
            <Text
              style={tw.style(
                `${
                  list(space as Space).length ? `text-[${color}]` : `text-white`
                }`,
                { ...FontGmarketSansBold }
              )}
              fontSize={15}
            >
              {list(space as Space).length}개
            </Text>
          </View>
        ))}
      </View>
      <View style={tw`flex-row items-center self-center pb-2`}>
        <Text fontSize={14} style={tw`text-blue-700`}>
          들어가기
        </Text>
        <Icon
          name='enter-outline'
          type='Ionicons'
          size={22}
          color={DEEP_BLUE}
        />
      </View>
    </View>
  );
}
