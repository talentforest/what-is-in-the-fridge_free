import { KeyboardAvoidingView, ScrollView, View } from 'react-native';
import { Text } from '../components/native-component';
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
    <KeyboardAvoidingView
      behavior='padding'
      style={tw`flex-1 bg-neutral-50 px-4 pt-[${statusBarHeight + 14}px]`}
      keyboardVerticalOffset={statusBarHeight + 40}
    >
      <Text styletw='pb-2 text-lg text-slate-600'>장보기 식료품 목록</Text>
      <RecommendedFoods />
      {shoppingList.length === 0 ? (
        <Text styletw='text-center flex-1 mt-40 mb-4 text-indigo-600'>
          장보기 식료품 정보가 없습니다.
        </Text>
      ) : (
        <ScrollView style={tw`flex-1`}>
          {shoppingList.map((food) => (
            <ListItem key={food.name} food={food} />
          ))}
        </ScrollView>
      )}
      <TextInputToAddList />
    </KeyboardAvoidingView>
  );
}
