import { View } from 'react-native';
import { Text, TouchableOpacity } from '../../native-component';
import { useNavigation } from '@react-navigation/native';
import { NavigateProp } from '../../../navigation/Navigation';
import { Food } from '../../../constant/foods';
import { INDIGO, ORANGE_RED } from '../../../constant/colors';
import LeftDay from '../../common/LeftDay';
import FoodTag from './FoodTag';
import tw from 'twrnc';
import Icon from '../../native-component/Icon';
import { scaleH } from '../../../util';

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
    <TouchableOpacity onPress={onPress} style={tw`my-6`}>
      <View style={tw`mb-2 h-[${scaleH(74)}px]`}>
        <View style={tw`flex-row items-center justify-between`}>
          <Text style={tw`text-indigo-600`}>{title}</Text>
          <Icon
            type='MaterialCommunityIcons'
            name='chevron-right'
            size={20}
            color={INDIGO}
          />
        </View>
        <View
          style={tw`flex-1 mt-2 flex-row items-center gap-1 px-3 bg-amber-50 rounded-lg border border-slate-300`}
        >
          <Icon
            type='MaterialCommunityIcons'
            name={
              title === '자주 먹는 식료품'
                ? 'heart-circle-outline'
                : 'alert-circle-outline'
            }
            size={16}
            color={ORANGE_RED}
          />
          <View style={tw`flex-row`}>
            <Text>총</Text>
            <Text style={tw`ml-1 text-amber-600`}>{foods.length}</Text>
            <Text>개의 식료품</Text>
          </View>

          {foods.length === 0 && (
            <View style={tw`flex-1`}>
              <Text
                style={tw`text-slate-400 text-center self-end`}
                fontSize={12}
              >
                {title === '자주 먹는 식료품'
                  ? '자주 먹는 식료품을 추가해보세요'
                  : '냉장고가 깨끗해요!'}
              </Text>
            </View>
          )}
        </View>
      </View>
      <View style={tw`gap-2 flex-row justify-between`}>
        {foods.length !== 0 && (
          <View style={tw`flex-row gap-0.5 flex-wrap flex-1`}>
            {foods.slice(0, 6).map((food) => (
              <FoodTag key={food.id} food={food}>
                {title === '유통기한 주의 식료품' && (
                  <LeftDay fontSize={12} expiredDate={food.expiredDate} />
                )}
              </FoodTag>
            ))}
            {foods.length > 6 && (
              <Text style={tw`text-amber-500 self-end pl-2 pb-1`} fontSize={12}>
                ...더보기
              </Text>
            )}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}
