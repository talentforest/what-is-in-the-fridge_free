import { KeyboardAvoidingView, ScrollView, View } from 'react-native';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
} from '../components/native-component';
import { useDispatch, useSelector } from '../redux/hook';
import { useState } from 'react';
import {
  addToShoppingList,
  removeFromShoppingList,
} from '../redux/slice/shoppingList';
import { Food, initialFoodInfo } from '../constant/foods';
import { getISODate } from '../util';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Icon from 'react-native-vector-icons/AntDesign';
import tw from 'twrnc';
import UUIDGenerator from 'react-native-uuid';
import AddFoodModalBtn from '../components/screen-component/compartments/AddFoodModalBtn';
import useRecommendedFoods from '../hooks/useRecommendedFoods';

export default function ShoppingList() {
  const [foodName, setFoodName] = useState('');
  const [selectedFood, setSelectedFood] = useState<Food>(initialFoodInfo);
  const statusBarHeight = getStatusBarHeight(true);

  const { shoppingList } = useSelector((state) => state.shoppingList);
  const { getRecommendedShoppingList } = useRecommendedFoods();
  const dispatch = useDispatch();
  const myUuid = UUIDGenerator.v4();

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior='padding'
        style={tw`flex-1 `}
        keyboardVerticalOffset={statusBarHeight + 44}
      >
        {getRecommendedShoppingList().length !== 0 && (
          <View style={tw`pb-6`}>
            <Text styletw='p-4 pb-2 text-slate-600'>추천 장보기 식료품</Text>
            <View style={tw`px-4 flex-row flex-wrap gap-1`}>
              {getRecommendedShoppingList().map((food) => (
                <TouchableOpacity
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
                  <View
                    key={food.name}
                    style={tw`flex-row items-center gap-2 p-3 mb-1 border border-slate-300 w-full rounded-lg bg-white`}
                  >
                    <Icon name='checksquareo' size={16} color='#ff8800' />
                    <Text styletw='text-indigo-600 flex-1'>
                      {food.image || ''} {food.name}
                    </Text>
                    <AddFoodModalBtn
                      selectedFood={selectedFood}
                      onPress={() => {
                        setSelectedFood({
                          ...food,
                          id: myUuid as string,
                          name: food.name,
                          expirationDate: getISODate(new Date()),
                          purchaseDate: getISODate(new Date()),
                        });
                      }}
                    />
                    <TouchableOpacity
                      style={tw`ml-2`}
                      onPress={() =>
                        dispatch(removeFromShoppingList({ name: food.name }))
                      }
                    >
                      <Icon name='delete' size={20} color='#ff8800' />
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            </>
          )}
          <View style={tw`mx-4`}>
            <TextInput
              value={foodName}
              onChangeText={setFoodName}
              styletw='h-12 rounded-3xl px-5'
              placeholder='장보기 목록에 추가할 식료품을 작성해주세요.'
              returnKeyType='done'
              onSubmitEditing={() => {
                if (foodName === '') return;
                dispatch(
                  addToShoppingList({ ...initialFoodInfo, name: foodName })
                );
                setFoodName('');
              }}
              blurOnSubmit={false}
            />
            <TouchableOpacity
              style={tw`absolute right-3 top-3`}
              onPress={() => {
                if (foodName === '') return;
                dispatch(
                  addToShoppingList({ ...initialFoodInfo, name: foodName })
                );
                setFoodName('');
              }}
            >
              <Icon name='pluscircle' size={22} color='#4f46e5' />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
