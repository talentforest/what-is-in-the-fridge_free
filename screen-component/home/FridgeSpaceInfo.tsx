import { View } from 'react-native';
import { Text } from '../../components/common/native-component';
import { Space } from '../../constant/fridgeInfo';
import { ICE_BLUE, LIGHT_BLUE, MEDIUM_GRAY } from '../../constant/colors';
import { useGetFoodList } from '../../hooks';

import IconChevronRight from '../../components/svg/arrow/IconChevronRight';
import Icon from '../../components/common/native-component/Icon';
import tw from 'twrnc';

interface Props {
  space: Space;
}

export default function FridgeSpaceInfo({ space }: Props) {
  const { getMatchedPositionFoods } = useGetFoodList();

  const getColor = (listLength: number, name: string) => {
    const activeColor = name === '총 식료품' ? 'text-blue-700' : 'text-red-600';
    const inActiveColor = 'text-slate-400';
    return listLength ? activeColor : inActiveColor;
  };

  const spaceInfo = [
    {
      name: '총 식료품',
      foodList: (space: Space) => getMatchedPositionFoods('allFoods', space),
    },
    {
      name: '소비기한 주의',
      foodList: (space: Space) =>
        getMatchedPositionFoods('expiredFoods', space),
    },
  ];

  return (
    <View style={tw`h-full px-1.5 pt-1 bg-white rounded-lg`}>
      {/* 냉장고 공간 이름 */}
      <View>
        <View style={tw`flex-row py-1 items-center justify-between`}>
          <View style={tw`flex-row gap-1 py-0.5 items-center`}>
            <Icon
              name='information-outline'
              type='MaterialCommunityIcons'
              color={LIGHT_BLUE}
              size={14}
            />
            <Text fontSize={15} style={tw`text-slate-900`}>
              {space}
            </Text>
          </View>

          <IconChevronRight size={15} color={MEDIUM_GRAY} />
        </View>

        <View
          style={tw`border border-[${ICE_BLUE}] h-0.1 rounded-full w-full`}
        />
      </View>

      {/* 냉장고 공간 정보 */}
      <View style={tw`flex-1 mt-1.5 gap-1.5`}>
        {spaceInfo.map(({ name, foodList }) => (
          <View key={name} style={tw`flex-row items-center justify-between`}>
            {[name, foodList(space).length].map((info) => (
              <Text
                key={info}
                fontSize={15}
                style={tw.style(`${getColor(foodList(space).length, name)}`, {
                  letterSpacing: -0.5,
                })}
              >
                {info}
              </Text>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}
