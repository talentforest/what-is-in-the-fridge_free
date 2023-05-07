import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity } from '../../native-component';
import { NavigateProp } from '../../../navigation/Navigation';
import { useSelector } from '../../../redux/hook';
import { getLeftDays } from '../../../util';
import { Space as SpaceType } from '../../../constant/fridge';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Props {
  space: SpaceType;
  bottom?: boolean;
  door?: boolean;
}

export default function Space({ space, bottom, door }: Props) {
  const { fridgeFoods, freezerFoods } = useSelector((state) => state.foodsList);
  const navigation = useNavigation<NavigateProp>();

  const foodList = space.includes('냉동') ? freezerFoods : fridgeFoods;

  const getFoodListLength = () => {
    return foodList.filter((food) => food.space === space).length;
  };

  const getExpiredFoodList = () => {
    return foodList.filter((food) => {
      return food.space === space && getLeftDays(food.expirationDate) < 4;
    }).length;
  };

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Compartments', { space })}
      style={tw`border border-slate-400 w-full justify-center items-center ${
        bottom
          ? `h-[55%] rounded-b-lg border-t-0 bg-yellow-100`
          : `h-[45%] rounded-t-lg bg-indigo-100`
      } ${door ? 'rounded-l-none' : 'rounded-r-none'}`}
    >
      <View style={tw`p-2 py-3 flex-1 w-full`}>
        <View style={tw`flex-row items-center mb-2 justify-between`}>
          <Text styletw='text-indigo-700 text-base'>
            {space} {bottom ? '3칸' : '2칸'}
          </Text>
          <Icon name='keyboard-arrow-right' size={24} color='#4e45ff' />
        </View>
        <View
          style={tw`p-3 gap-4 border flex-1 rounded-lg bg-white border-slate-400`}
        >
          <View style={tw`justify-between gap-1`}>
            <Text styletw='text-slate-500'>식료품 총 개수</Text>
            <Text styletw='self-end text-indigo-600 border px-2 py-1 rounded-lg border-slate-400'>
              {getFoodListLength()}개
            </Text>
          </View>
          <View style={tw`justify-between gap-1`}>
            <Text styletw='text-slate-500'>유통기한 임박 식품 총 개수</Text>
            <Text styletw='self-end text-red-500 border px-2 py-1 rounded-lg border-slate-400'>
              {getExpiredFoodList()}개
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
