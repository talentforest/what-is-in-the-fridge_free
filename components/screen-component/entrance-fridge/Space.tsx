import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity } from '../../native-component';
import { NavigateProp } from '../../../navigation/Navigation';
import { INDIGO, LIGHT_GRAY, ORANGE_RED } from '../../../constant/colors';
import {
  CompartmentNum,
  Space as SpaceType,
} from '../../../constant/fridgeInfo';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import useGetFoodList from '../../../hooks/useGetFoodList';
import useExpiredFoods from '../../../hooks/useExpiredFoods';

interface Props {
  space: SpaceType;
  bottom?: boolean;
  door?: boolean;
}

export default function Space({ space, bottom, door }: Props) {
  const navigation = useNavigation<NavigateProp>();
  const compartmentArr: CompartmentNum[] = bottom
    ? ['1번', '2번', '3번']
    : ['1번', '2번'];
  const { getFoodList } = useGetFoodList();
  const { getExpiredFoodList } = useExpiredFoods();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Compartments', { space })}
      style={tw`p-2 border border-slate-400 w-full justify-center items-center bg-slate-200 ${
        bottom ? `h-[60%] border-t-0` : `h-[40%] `
      } ${door ? 'border-l-0' : ''}`}
    >
      <View
        style={tw`rounded-lg flex-1 w-full border-2 border-slate-300 bg-white`}
      >
        {compartmentArr.map((compartment: CompartmentNum) => (
          <View
            key={compartment}
            style={tw`${
              +compartment.slice(0, 1) === compartmentArr.length
                ? 'border-b-0'
                : 'border-b-2'
            } border-slate-300 flex-1 p-1.5 justify-between`}
          >
            <View style={tw`flex-row justify-between`}>
              <Text
                styletw={`text-xs ${
                  space.includes('냉동') ? 'text-blue-600' : 'text-green-600'
                }`}
              >
                {compartment}칸
              </Text>
              {compartment === compartmentArr[0] && (
                <View>
                  <Text
                    styletw={`text-xs ${
                      space.includes('냉동')
                        ? 'text-blue-600'
                        : 'text-green-600'
                    }`}
                  >
                    {space}
                  </Text>
                </View>
              )}
            </View>
            <View style={tw`gap-3 flex-row items-center`}>
              <View style={tw`gap-1 flex-row items-center w-8`}>
                <Icon
                  name='food'
                  size={14}
                  color={`${
                    getFoodList(space, compartment).length ? INDIGO : LIGHT_GRAY
                  }`}
                />
                <Text
                  styletw={`${
                    getFoodList(space, compartment).length
                      ? `text-[${INDIGO}]`
                      : `text-[${LIGHT_GRAY}]`
                  } text-xs`}
                >
                  {getFoodList(space, compartment).length}개
                </Text>
              </View>
              <View style={tw`gap-1 flex-row items-center`}>
                <Icon
                  name='alert-octagram-outline'
                  size={16}
                  color={`${
                    getExpiredFoodList(space, compartment).length !== 0
                      ? ORANGE_RED
                      : LIGHT_GRAY
                  }`}
                />
                <Text
                  styletw={`${
                    getExpiredFoodList(space, compartment).length !== 0
                      ? `text-[${ORANGE_RED}]`
                      : `text-[${LIGHT_GRAY}]`
                  } text-xs`}
                >
                  {getExpiredFoodList(space, compartment).length}개
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
}
