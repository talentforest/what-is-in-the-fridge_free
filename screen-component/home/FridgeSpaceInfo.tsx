import { View } from 'react-native';
import { Text } from '../../components/common/native-component';
import { Space } from '../../constant/fridgeInfo';
import {
  BLUE,
  ICE_BLUE,
  LIGHT_BLUE,
  LIGHT_GRAY,
  MEDIUM_GRAY,
  RED,
} from '../../constant/colors';
import { useGetFoodList } from '../../hooks';

import IconChevronRight from '../../components/svg/arrow/IconChevronRight';
import Icon from '../../components/common/native-component/Icon';
import tw from 'twrnc';

interface Props {
  space: Space;
}

export default function FridgeSpaceInfo({ space }: Props) {
  const { getMatchedPositionFoods } = useGetFoodList();

  const getColor = (listLength: number, name: string, tw?: 'tw') => {
    const active = name === '식료품 총' ? BLUE : RED;
    const inActive = LIGHT_GRAY;

    const twActiveColor =
      name === '식료품 총' ? 'text-blue-700' : 'text-red-600';
    const twInActiveColor = 'text-slate-400';
    const activeColor = tw === 'tw' ? twActiveColor : active;
    const inActiveColor = tw === 'tw' ? twInActiveColor : inActive;

    return listLength ? activeColor : inActiveColor;
  };

  const spaceInfo = [
    {
      iconName: 'notification-clear-all',
      name: '식료품 총',
      foodList: (space: Space) => getMatchedPositionFoods('allFoods', space),
    },
    {
      iconName: 'alert-rhombus-outline',
      name: '소비기한 주의',
      foodList: (space: Space) =>
        getMatchedPositionFoods('cautionFoods', space),
    },
  ];

  return (
    <View
      style={tw`h-full ${
        space === '실온보관'
          ? 'flex-row gap-7 items-end'
          : 'bg-white border border-gray-300 rounded-xl px-1.5 pt-1'
      }`}
    >
      {/* 냉장고 공간 이름 */}
      <View>
        <View style={tw`flex-row py-1 items-center justify-between`}>
          <View style={tw`flex-row gap-1 py-0.5 items-center`}>
            {space !== '실온보관' && (
              <Icon
                name='information-outline'
                type='MaterialCommunityIcons'
                color={LIGHT_BLUE}
                size={14}
              />
            )}
            <Text fontSize={15} style={tw`text-slate-900`}>
              {space}
            </Text>
          </View>

          <IconChevronRight size={15} color={MEDIUM_GRAY} />
        </View>

        {space !== '실온보관' && (
          <View
            style={tw`border border-[${ICE_BLUE}] h-0.1 rounded-full w-full`}
          />
        )}
      </View>

      {/* 냉장고 공간 정보 */}
      <View style={tw`flex-1 mt-1 gap-0.5`}>
        {spaceInfo.map(({ iconName, name, foodList }) => (
          <View
            key={name}
            style={tw`flex-row items-center justify-between p-0.5`}
          >
            <View style={tw`flex-row items-center gap-1`}>
              <Icon
                name={iconName}
                type='MaterialCommunityIcons'
                size={12}
                color={getColor(foodList(space).length, name)}
              />
              <Text
                fontSize={14}
                style={tw.style(
                  `-ml-0.5 ${getColor(foodList(space).length, name, 'tw')}`,
                  { letterSpacing: -1 }
                )}
              >
                {name}
              </Text>
            </View>

            <Text
              fontSize={14}
              style={tw.style(
                `${getColor(foodList(space).length, name, 'tw')}`,
                { letterSpacing: -0.5 }
              )}
            >
              {foodList(space).length}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
