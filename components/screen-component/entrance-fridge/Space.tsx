import { Platform, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity } from '../../native-component';
import { NavigateProp } from '../../../navigation/Navigation';
import { INDIGO, LIGHT_GRAY, ORANGE_RED } from '../../../constant/colors';
import { Space as SpaceType } from '../../../constant/fridgeInfo';
import { useSelector } from '../../../redux/hook';
import { getCompartments } from '../../../util';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import useGetFoodList from '../../../hooks/useGetFoodList';
import useExpiredFoods from '../../../hooks/useExpiredFoods';
import tw from 'twrnc';

interface Props {
  space: SpaceType;
}

export default function Space({ space }: Props) {
  const navigation = useNavigation<NavigateProp>();
  const { fridgeInfo } = useSelector((state) => state.fridgeInfo);

  const { getFoodList } = useGetFoodList();
  const { filterExpiredFoods } = useExpiredFoods();

  const compartmentNums = fridgeInfo.compartments[space];

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Compartments', { space })}
      style={tw`p-2 border border-slate-400 w-full justify-center items-center bg-slate-200 ${
        space.includes('냉장실') ? `h-[60%] border-t-0` : `h-[40%]`
      } ${space.includes('문쪽') ? 'border-l-0 ' : ''} ${
        Platform.OS === 'android'
          ? space.includes('문쪽')
            ? 'rounded-r-lg'
            : 'rounded-l-lg'
          : ''
      }`}
    >
      <View
        style={tw`rounded-lg flex-1 w-full border-2 border-slate-300 bg-white`}
      >
        {getCompartments(compartmentNums).map(({ compartmentNum }) => (
          <View
            key={compartmentNum}
            style={tw`${
              +compartmentNum.slice(0, 1) ===
              getCompartments(compartmentNums).length
                ? 'border-b-0'
                : 'border-b-2'
            } border-slate-300 flex-1 p-1.5 justify-between`}
          >
            {compartmentNum === '1번' && (
              <Text
                styletw={`${
                  space.includes('냉동') ? 'text-blue-700' : 'text-teal-700'
                } absolute right-0`}
              >
                {space}
              </Text>
            )}

            <View style={tw`gap-3 flex-row items-end flex-1`}>
              <View style={tw`gap-1 flex-row items-center w-8`}>
                <Icon
                  name='food-fork-drink'
                  size={13}
                  color={`${
                    getFoodList(space, compartmentNum).length
                      ? INDIGO
                      : LIGHT_GRAY
                  }`}
                />
                <Text
                  styletw={`${
                    getFoodList(space, compartmentNum).length
                      ? `text-[${INDIGO}]`
                      : `text-[${LIGHT_GRAY}]`
                  } text-xs`}
                >
                  {getFoodList(space, compartmentNum).length}개
                </Text>
              </View>
              <View style={tw`gap-1 flex-row items-center`}>
                <Icon
                  name='alert-octagram-outline'
                  size={14}
                  color={`${
                    filterExpiredFoods(space, compartmentNum).length !== 0
                      ? ORANGE_RED
                      : LIGHT_GRAY
                  }`}
                />
                <Text
                  styletw={`${
                    filterExpiredFoods(space, compartmentNum).length !== 0
                      ? `text-[${ORANGE_RED}]`
                      : `text-[${LIGHT_GRAY}]`
                  } text-xs`}
                >
                  {filterExpiredFoods(space, compartmentNum).length}개
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
}
