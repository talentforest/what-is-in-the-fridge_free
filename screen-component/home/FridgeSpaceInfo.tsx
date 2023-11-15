import { View } from 'react-native';
import { Text } from '../../components/common/native-component';
import { Space } from '../../constant/fridgeInfo';
import { GRAY, LIGHT_BLUE } from '../../constant/colors';
import { useGetFoodList } from '../../hooks';

import IconChevronRight from '../../components/svg/arrow/IconChevronRight';
import Icon from '../../components/common/native-component/Icon';
import tw from 'twrnc';

interface Props {
  space: Space;
}

export default function FridgeSpaceInfo({ space }: Props) {
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
    <View style={tw`h-full px-2 pt-1 bg-white rounded-lg`}>
      {/* 냉장고 공간 이름 */}
      <View>
        <View style={tw`flex-row gap-1 py-1 items-center`}>
          <Icon
            name='information-outline'
            type='MaterialCommunityIcons'
            color={GRAY}
            size={14}
          />
          <Text fontSize={16}>{space}</Text>
        </View>
        <View style={tw`border border-slate-300 h-0.1 rounded-full w-full`} />
      </View>

      {/* 냉장고 공간 정보 */}
      <View style={tw`flex-1 mt-1`}>
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

      {/* 들어가기 버튼 */}
      <View style={tw`self-end flex-row items-center -mr-1 mb-0.5`}>
        <Text fontSize={13} style={tw`text-sky-300`}>
          들어가기
        </Text>

        <IconChevronRight size={14} color={'#7dd3fc'} />
      </View>
    </View>
  );
}
