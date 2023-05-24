import { ScrollView, View } from 'react-native';
import { Text, KeyboardAvoidingView } from '../components/native-component';
import { useSelector } from '../redux/hook';
import RecommendedFoods from '../components/screen-component/shopping-list/RecommendedFoods';
import TextInputToAddList from '../components/screen-component/shopping-list/TextInputToAddList';
import ShoppingItem from '../components/screen-component/shopping-list/ShoppingItem';
import tw from 'twrnc';

export default function ShoppingList() {
  const { shoppingList } = useSelector((state) => state.shoppingList);

  return (
    <KeyboardAvoidingView>
      <Text styletw='pb-2 text-lg text-slate-600'>장보기 식료품 목록</Text>
      <View style={tw`flex-1`}>
        <RecommendedFoods />
        {shoppingList.length === 0 ? (
          <Text styletw='text-center flex-1 mt-40 mb-4 text-indigo-600'>
            장보기 식료품 정보가 없습니다.
          </Text>
        ) : (
          <ScrollView style={tw`flex-1`}>
            {shoppingList.map((food) => (
              <ShoppingItem key={food.name} food={food} />
            ))}
          </ScrollView>
        )}
      </View>
      <TextInputToAddList />
    </KeyboardAvoidingView>
  );
}
