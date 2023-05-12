import { KeyboardAvoidingView, ScrollView, View } from 'react-native';
import { SafeBottomAreaView, Text } from '../components/native-component';
import { useSelector } from '../redux/hook';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import RecommendedFoods from '../components/screen-component/shopping-list/RecommendedFoods';
import TextInputToAddList from '../components/screen-component/shopping-list/TextInputToAddList';
import ListItem from '../components/screen-component/shopping-list/ListItem';
import tw from 'twrnc';

export default function ShoppingList() {
  const { shoppingList } = useSelector((state) => state.shoppingList);

  const statusBarHeight = getStatusBarHeight(true);

  return (
    <SafeBottomAreaView>
      <KeyboardAvoidingView
        behavior='padding'
        style={tw`flex-1`}
        keyboardVerticalOffset={statusBarHeight + 40}
      >
        <RecommendedFoods />
        <View style={tw`flex-1 pb-2`}>
          {shoppingList.length === 0 ? (
            <Text styletw='text-center mt-40 mb-4 text-base text-indigo-600'>
              장보기 정보가 없습니다.
            </Text>
          ) : (
            <>
              <Text styletw='p-4 pb-2 text-slate-600'>사야할 식료품 목록</Text>
              <ScrollView style={tw`flex-1 p-4 pt-0`}>
                {shoppingList.map((food) => (
                  <ListItem key={food.name} food={food} />
                ))}
              </ScrollView>
            </>
          )}
        </View>
        <TextInputToAddList />
      </KeyboardAvoidingView>
    </SafeBottomAreaView>
  );
}
