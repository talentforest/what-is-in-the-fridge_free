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
      name: '식료품 개수',
      icon: 'food-outline',
      list: getFoodList(space, compartmentNum),
      color: INDIGO,
    },
    {
      name: '유통기한 주의 개수',
      icon: 'fridge-industrial-alert-outline',
      list: filterExpiredFoods(space, compartmentNum),
      color: ORANGE_RED,
    },
  ];

  return (
    <View
      key={compartmentNum}
      style={tw`flex-1 w-[92%] mx-auto rounded-[4px] justify-end items-end border border-slate-300 bg-white`}
    >
      {space.includes('문쪽') && (
        <View
          style={tw`border w-full absolute left-0 h-[60%] rounded-b-[4px] border-slate-300 shadow-md  bg-slate-100`}
        />
      )}
      {showInfo && (
        <View style={tw`mb-0.5 px-2 flex-row gap-2 items-center`}>
          {compartmentInfo.map((info) => (
            <View key={info.name} style={tw`gap-1 flex-row items-center`}>
              <Icon
                type='MaterialCommunityIcons'
                name={info.icon}
                size={14}
                color={`${!!info.list.length ? info.color : LIGHT_GRAY}`}
              />
              <Text
                style={tw`${
                  info.list.length
                    ? `text-[${info.color}]`
                    : `text-[${LIGHT_GRAY}]`
                }`}
                fontSize={12}
              >
                {info.list.length}개
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}
