import { ScrollView, View } from 'react-native';
import {
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
import Icon from 'react-native-vector-icons/AntDesign';
import tw from 'twrnc';
import UUIDGenerator from 'react-native-uuid';
import AddFoodModalBtn from '../components/screen-component/compartments/AddFoodModalBtn';
import { getISODate } from '../util';

export default function ShoppingList() {
  const [foodName, setFoodName] = useState('');
  const [selectedFood, setSelectedFood] = useState<Food>(initialFoodInfo);

  const { shoppingList } = useSelector((state) => state.shoppingList);
  const dispatch = useDispatch();
  const myUuid = UUIDGenerator.v4();

  return (
    <View style={tw`flex-1 bg-indigo-50 pb-10`}>
      {shoppingList.length === 0 ? (
        <Text styletw='text-center mt-40 text-base text-indigo-600'>
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
                <Text styletw='text-indigo-600 flex-1'>{food.name}</Text>
                <AddFoodModalBtn
                  selectedFood={selectedFood}
                  onPress={() => {
                    setSelectedFood({
                      ...selectedFood,
                      id: myUuid as string,
                      name: food.name,
                      expirationDate: getISODate(new Date()),
                      purchaseDate: getISODate(new Date()),
                    });
                  }}
                />
                <TouchableOpacity
                  onPress={() =>
                    dispatch(removeFromShoppingList({ name: food.name }))
                  }
                >
                  <Icon name='delete' size={16} color='#ff8800' />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </>
      )}
      <View style={tw`mx-4 my-2`}>
        <TextInput
          value={foodName}
          onChangeText={setFoodName}
          focusable={true}
          styletw='h-12 rounded-3xl px-5'
          placeholder='장보기 목록에 추가할 식료품을 작성해주세요.'
          returnKeyType='done'
          autoFocus={true}
          onSubmitEditing={() => {
            if (foodName === '') return;
            dispatch(addToShoppingList({ name: foodName }));
            setFoodName('');
          }}
          blurOnSubmit={false}
        />
        <TouchableOpacity
          style={tw`absolute right-3 top-3`}
          onPress={() => {
            if (foodName === '') return;
            dispatch(addToShoppingList({ name: foodName }));
            setFoodName('');
          }}
        >
          <Icon name='pluscircle' size={22} color='#4f46e5' />
        </TouchableOpacity>
      </View>
    </View>
  );
}
