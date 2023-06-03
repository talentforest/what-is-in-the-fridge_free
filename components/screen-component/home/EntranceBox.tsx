import { View } from 'react-native';
import { Text, TouchableOpacity } from '../../native-component';
import { useNavigation } from '@react-navigation/native';
import { NavigateProp } from '../../../navigation/Navigation';
import { Food } from '../../../constant/foods';
import { INDIGO } from '../../../constant/colors';
import Icon from 'react-native-vector-icons/AntDesign';
import LeftDay from '../../common/LeftDay';
import FoodTag from './FoodTag';
import tw from 'twrnc';

interface Props {
  title: EntranceTitle;
  foods: Food[];
}

export type EntranceTitle =
  | '유통기한 주의 식료품 목록'
  | '자주 먹는 식료품 목록';

export default function EntranceBox({ title, foods }: Props) {
  const navigation = useNavigation<NavigateProp>();

  const onPress = () => {
    navigation.navigate(
      title === '자주 먹는 식료품 목록' ? 'FavoriteFoods' : 'ExpiredFoods'
    );
  };

  return (
    <View style={tw`my-4 gap-2 `}>
      <Text styletw='text-base text-indigo-600'>{title}</Text>
      <TouchableOpacity
        onPress={onPress}
        style={tw`gap-2 flex-row justify-between border border-slate-300 bg-white shadow-sm rounded-lg p-2`}
      >
        {foods.length !== 0 ? (
          <View style={tw`flex-row min-h-24 gap-1 flex-wrap flex-1 `}>
            {foods.slice(0, 8).map((food) => (
              <FoodTag key={food.id} food={food}>
                {title === '유통기한 주의 식료품 목록' && (
                  <LeftDay expiredDate={food.expiredDate} />
                )}
              </FoodTag>
            ))}
            {foods.length > 8 && <Text>...</Text>}
          </View>
        ) : (
          <View style={tw`p-4 h-24 justify-center items-center gap-2 flex-1`}>
            <Text styletw='text-sm text-slate-500 text-center'>
              {title === '자주 먹는 식료품 목록'
                ? '아직 자주 먹는 식료품 정보가 없습니다'
                : '아직 유통기한이 지난 식료품이 없습니다'}
            </Text>
          </View>
        )}
        <Icon
          name='rightcircleo'
          size={18}
          color={INDIGO}
          style={tw`self-center`}
        />
      </TouchableOpacity>
    </View>
  );
}
