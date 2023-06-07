import { View } from 'react-native';
import { Text, TouchableOpacity } from '../../native-component';
import { useNavigation } from '@react-navigation/native';
import { NavigateProp } from '../../../navigation/Navigation';
import { Food } from '../../../constant/foods';
import { INDIGO, ORANGE_RED } from '../../../constant/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LeftDay from '../../common/LeftDay';
import FoodTag from './FoodTag';
import tw from 'twrnc';

interface Props {
  title: EntranceTitle;
  foods: Food[];
}

export type EntranceTitle = '유통기한 주의 식료품' | '자주 먹는 식료품';

export default function EntranceBox({ title, foods }: Props) {
  const navigation = useNavigation<NavigateProp>();

  const onPress = () => {
    navigation.navigate(
      title === '자주 먹는 식료품' ? 'FavoriteFoods' : 'ExpiredFoods'
    );
  };

  return (
    <TouchableOpacity onPress={onPress} style={tw`my-4`}>
      <View style={tw`flex-row items-center justify-between`}>
        <Text styletw='text-base text-indigo-600'>{title}</Text>
        <Icon
          name='chevron-right'
          size={20}
          color={INDIGO}
          style={tw`self-center`}
        />
      </View>
      <View
        style={tw`mt-2 flex-row items-center gap-1 p-3 bg-amber-50 rounded-lg border border-slate-300`}
      >
        <Icon
          name={
            title === '자주 먹는 식료품'
              ? 'heart-circle-outline'
              : 'alert-circle-outline'
          }
          size={20}
          color={ORANGE_RED}
        />
        <View style={tw`flex-row`}>
          <Text>총</Text>
          <Text styletw='ml-1 text-amber-600'>{foods.length}</Text>
          <Text>개의 식료품</Text>
        </View>

        {foods.length === 0 && (
          <View style={tw`flex-1`}>
            <Text styletw='text-xs text-slate-400 text-center self-end '>
              {title === '자주 먹는 식료품'
                ? '자주 먹는 식료품을 추가해보세요'
                : '냉장고가 깨끗해요!'}
            </Text>
          </View>
        )}
      </View>
      <View style={tw`gap-2 flex-row justify-between mt-1`}>
        {foods.length !== 0 && (
          <View style={tw`flex-row gap-1 flex-wrap flex-1`}>
            {foods.slice(0, 6).map((food) => (
              <FoodTag key={food.id} food={food}>
                {title === '유통기한 주의 식료품' && (
                  <LeftDay expiredDate={food.expiredDate} />
                )}
              </FoodTag>
            ))}
            {foods.length > 6 && (
              <Text styletw='text-xs text-indigo-600 self-end pl-3 pb-1'>
                ...더보기
              </Text>
            )}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}
