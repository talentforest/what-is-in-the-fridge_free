import { View } from 'react-native';
import { Text, TouchableOpacity } from '../../native-component';
import { useDispatch } from '../../../redux/hook';
import { DEEP_INDIGO } from '../../../constant/colors';
import { addToShoppingList } from '../../../redux/slice/shoppingList';
import Icon from 'react-native-vector-icons/AntDesign';
import useRecommendedFoods from '../../../hooks/useRecommendedFoods';
import tw from 'twrnc';

export default function RecommendedFoods() {
  const { getRecommendedShoppingList } = useRecommendedFoods();
  const dispatch = useDispatch();

  return (
    <>
      {getRecommendedShoppingList().length !== 0 && (
        <View style={tw`p-4 py-2`}>
          <Text styletw='pb-2 text-slate-500'>추천 장보기 식료품</Text>
          <View style={tw`flex-row flex-wrap gap-1`}>
            {getRecommendedShoppingList().map((food) => (
              <TouchableOpacity
                key={food.id}
                style={tw`flex-row items-center justify-between gap-2 border border-slate-300 px-2 py-1 rounded-lg bg-white`}
                onPress={() => dispatch(addToShoppingList(food))}
              >
                <Text styletw='text-indigo-700'>{food.name}</Text>
                <Icon name='pluscircle' size={14} color={DEEP_INDIGO} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </>
  );
}
