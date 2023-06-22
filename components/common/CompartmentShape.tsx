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

export default function CompartmentShape({
  showInfo,
  space,
  compartmentNum,
}: Props) {
  const { getFoodList } = useGetFoodList();
  const { filterExpiredFoods } = useExpiredFoods();

  const compartmentInfo = [
    {
      name: '식료품',
      icon: 'food-outline',
      list: getFoodList(space, compartmentNum),
      color: INDIGO,
    },
    {
      name: '유통기한 주의',
      icon: 'fridge-industrial-alert-outline',
      list: filterExpiredFoods(space, compartmentNum),
      color: ORANGE_RED,
    },
  ];

  return (
    <View
      key={compartmentNum}
      style={tw`flex-1 w-[92%] mx-auto rounded-[4px] justify-end border border-slate-300 bg-white`}
    >
      {space.includes('문쪽') && (
        <View
          style={tw`border w-full absolute left-0 h-[60%] rounded-b-[4px] border-slate-300 shadow-md  bg-slate-100`}
        />
      )}
      {showInfo && (
        <View style={tw`mb-0.5 px-2 gap-2 justify-center`}>
          {compartmentInfo.map(({ name, icon, list, color }) => (
            <View key={name} style={tw`gap-1 flex-row items-center`}>
              <Icon
                type='MaterialCommunityIcons'
                name={icon}
                size={14}
                color={`${!!list.length ? color : LIGHT_GRAY}`}
              />
              <Text
                style={tw`${
                  list.length ? `text-[${color}]` : `text-[${LIGHT_GRAY}]`
                }`}
                fontSize={12}
              >
                {name} {list.length}개
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}
