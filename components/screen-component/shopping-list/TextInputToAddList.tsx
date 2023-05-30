import { useState } from 'react';
import { View } from 'react-native';
import { useDispatch } from '../../../redux/hook';
import { TextInput, TouchableOpacity } from '../../native-component';
import { addToShoppingList } from '../../../redux/slice/shoppingList';
import { initialFoodInfo } from '../../../constant/foods';
import { BG_LIGHT_GRAY, INDIGO } from '../../../constant/colors';
import UUIDGenerator from 'react-native-uuid';
import Icon from 'react-native-vector-icons/AntDesign';
import tw from 'twrnc';

export default function TextInputToAddList() {
  const [foodName, setFoodName] = useState('');

  const dispatch = useDispatch();
  const myUuid = UUIDGenerator.v4();

  return (
    <View style={tw`my-2 mx-4 bg-[${BG_LIGHT_GRAY}]`}>
      <TextInput
        value={foodName}
        onChangeText={setFoodName}
        styletw='rounded-3xl px-5'
        placeholder='장보기 목록에 추가할 식료품을 작성해주세요.'
        returnKeyType='done'
        onSubmitEditing={() => {
          if (foodName === '') return;
          dispatch(
            addToShoppingList({
              ...initialFoodInfo,
              id: myUuid as string,
              name: foodName,
            })
          );
          setFoodName('');
        }}
        blurOnSubmit={false}
      />
      <TouchableOpacity
        style={tw`absolute bottom-2.5 right-2`}
        onPress={() => {
          if (foodName === '') return;
          dispatch(addToShoppingList({ ...initialFoodInfo, name: foodName }));
          setFoodName('');
        }}
      >
        <Icon name='pluscircle' size={24} color={INDIGO} />
      </TouchableOpacity>
    </View>
  );
}
