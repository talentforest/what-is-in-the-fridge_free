import { View } from 'react-native';
import { Text } from '../../native-component';
import { Space } from '../../../constant/fridgeInfo';
import { BLUE, INDIGO, LIGHT_GRAY, ORANGE_RED } from '../../../constant/colors';
import { scaleH } from '../../../util';
import Icon from '../../native-component/Icon';
import tw from 'twrnc';
import useGetFoodList from '../../../hooks/useGetFoodList';
import useExpiredFoods from '../../../hooks/useExpiredFoods';

export default function CompartmentInfo({ space }: { space: Space }) {
  const { getFoodList } = useGetFoodList();
  const { filterExpiredFoods } = useExpiredFoods();

  const compartmentInfo = [
    {
      name: '식료품',
      icon: 'food-outline',
      list: (space: Space) => getFoodList(space),
      color: INDIGO,
    },
    {
      name: '유통기한 주의',
      icon: 'fridge-industrial-alert-outline',
      list: (space: Space) => filterExpiredFoods(space),
      color: ORANGE_RED,
    },
  ];

  return (
    <View
      style={tw`absolute gap-0.5 w-full h-full z-10 justify-center p-[${scaleH(
        12
      )}px]`}
    >
      <View
        style={tw`border rounded-full self-center ${
          space.includes('냉동') ? 'bg-amber-100' : 'bg-blue-50'
        } w-[${scaleH(
          28
        )}] pl-2 mb-2 border-slate-400 flex-row justify-center items-center py-1`}
      >
        <Text
          style={tw`text-center items-center justify-center ${
            space.includes('냉동') ? 'text-blue-600' : 'text-indigo-700'
          }`}
          fontSize={scaleH(14)}
        >
          {space}
        </Text>
        <Icon
          name='chevron-right'
          type='Feather'
          size={18}
          color={space.includes('냉동') ? BLUE : INDIGO}
        />
      </View>
      <View style={tw`gap-2 justify-center flex-row `}>
        {compartmentInfo.map(({ name, icon, list, color }) => (
          <View key={name} style={tw`gap-1 mb-1 flex-row`}>
            <Icon
              type='MaterialCommunityIcons'
              name={icon}
              size={16}
              color={`${!!list(space as Space).length ? color : LIGHT_GRAY}`}
            />
            <Text
              style={tw`${
                list(space as Space).length
                  ? `text-[${color}]`
                  : `text-[${LIGHT_GRAY}]`
              }`}
              fontSize={14}
            >
              {list(space as Space).length}개
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
