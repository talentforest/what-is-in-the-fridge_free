import { ScrollView, View } from 'react-native';
import { Text, TouchableOpacity } from '../../native-component';
import { useNavigation } from '@react-navigation/native';
import { NavigateProp } from '../../../navigation/Navigation';
import { DEEP_INDIGO } from '../../../constant/colors';
import { Food } from '../../../constant/foods';
import { INDIGO } from '../../../constant/colors';
import { EmptyTagName } from '../../common/EmptyTag';
import FoodTag from './FoodTag';
import Icon from 'react-native-vector-icons/AntDesign';
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
    <View style={tw`my-6 gap-3 min-h-34`}>
      <Text styletw='text-base text-indigo-700'>{title}</Text>
      <View style={tw`flex-row h-24 gap-2 justify-between`}>
        {foods.length !== 0 ? (
          <View style={tw`flex-row gap-2 flex-1`}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={tw`gap-1`}
              scrollEventThrottle={16}
            >
              {foods.map((food) => (
                <FoodTag key={food.id} food={food} label={title} />
              ))}
            </ScrollView>
          </View>
        ) : (
          <View
            style={tw`p-4 justify-center items-center gap-4 border flex-1 rounded-lg border-slate-300 bg-white`}
          >
            <Text styletw='text-sm text-slate-700 text-center'>
              {
                (title === '자주 먹는 식료품 목록'
                  ? '아직 자주 먹는 식료품 정보가 없습니다'
                  : '아직 유통기한이 지난 식료품이 없습니다') as EmptyTagName
              }
            </Text>
            {/* <TouchableOpacity
            onPress={onPress}
            style={tw`self-center flex-row border border-slate-400 bg-amber-300 px-3 py-2 rounded-full items-center`}
          >
            <Text styletw='text-indigo-700'>목록 관리하기</Text>
            <Icon name='right' size={14} color={DEEP_INDIGO} />
          </TouchableOpacity> */}
          </View>
        )}
        <TouchableOpacity
          onPress={onPress}
          style={tw`items-center gap-2 border-indigo-200 rounded-lg p-1 justify-center`}
        >
          <Icon name='rightcircle' size={18} color={INDIGO} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
