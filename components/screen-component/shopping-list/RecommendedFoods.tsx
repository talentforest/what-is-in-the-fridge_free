import { View } from 'react-native';
import { Text, TouchableOpacity } from '../../native-component';
import { useDispatch } from '../../../redux/hook';
import { addToShoppingList } from '../../../redux/slice/shoppingList';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/AntDesign';
import useRecommendedFoods from '../../../hooks/useRecommendedFoods';

export default function RecommendedFoods() {
  const { getRecommendedShoppingList } = useRecommendedFoods();
  const dispatch = useDispatch();

  return (
    <>
      {getRecommendedShoppingList().length !== 0 && (
        <View style={tw`pb-6`}>
          <Text styletw='p-4 pb-2 text-slate-600'>추천 장보기 식료품</Text>
          <View style={tw`px-4 flex-row flex-wrap gap-1`}>
            {getRecommendedShoppingList().map((food) => (
              <TouchableOpacity
                key={food.id}
                style={tw`flex-row items-center justify-between gap-3 border border-slate-300 px-2 py-2 rounded-xl bg-white `}
                onPress={() => dispatch(addToShoppingList(food))}
              >
                <Text styletw='text-sm text-indigo-700'>
                  {food.image} {food.name}
                </Text>
                <Icon name='pluscircle' size={16} color='#2f40ff' />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </>
  );
}
