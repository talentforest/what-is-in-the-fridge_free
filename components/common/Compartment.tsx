import { View } from 'react-native';
import { Text } from '../native-component';
import { CompartmentNum, Space } from '../../constant/fridgeInfo';
import { INDIGO, LIGHT_GRAY, ORANGE_RED } from '../../constant/colors';
import useGetFoodList from '../../hooks/useGetFoodList';
import useExpiredFoods from '../../hooks/useExpiredFoods';
import Icon from '../native-component/Icon';
import tw from 'twrnc';

interface Props {
  space: Space;
  compartmentNum: CompartmentNum;
  showInfo?: boolean;
}

export default function Compartment({
  showInfo,
  space,
  compartmentNum,
}: Props) {
  const { getFoodList } = useGetFoodList();
  const { filterExpiredFoods } = useExpiredFoods();

  return (
    <View
      key={compartmentNum}
      style={tw`flex-1 w-[92%] mx-auto rounded-[3px] justify-end items-end border border-slate-300 bg-white`}
    >
      {space.includes('문쪽') && (
        <View
          style={tw`border w-full absolute left-0 h-[55%] rounded-b-md border-slate-300 bg-slate-100`}
        />
      )}
      {showInfo && (
        <View style={tw`mb-0.5 px-2 flex-row gap-2`}>
          <View style={tw`gap-1 flex-row items-center`}>
            <Icon
              type='MaterialCommunityIcons'
              name='food-fork-drink'
              size={14}
              color={`${
                getFoodList(space as Space, compartmentNum).length
                  ? INDIGO
                  : LIGHT_GRAY
              }`}
            />
            <Text
              style={tw`${
                getFoodList(space as Space, compartmentNum).length
                  ? `text-[${INDIGO}]`
                  : `text-[${LIGHT_GRAY}]`
              }`}
              fontSize={12}
            >
              {getFoodList(space as Space, compartmentNum).length}개
            </Text>
          </View>
          <View style={tw`gap-1 flex-row items-center`}>
            <Icon
              type='MaterialCommunityIcons'
              name='alert-octagram-outline'
              size={15}
              color={`${
                filterExpiredFoods(space as Space, compartmentNum).length !== 0
                  ? ORANGE_RED
                  : LIGHT_GRAY
              }`}
            />
            <Text
              style={tw`${
                filterExpiredFoods(space as Space, compartmentNum).length !== 0
                  ? `text-[${ORANGE_RED}]`
                  : `text-[${LIGHT_GRAY}]`
              }`}
              fontSize={12}
            >
              {filterExpiredFoods(space as Space, compartmentNum).length}개
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}
