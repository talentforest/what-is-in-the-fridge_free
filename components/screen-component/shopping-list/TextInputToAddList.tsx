import { useState } from 'react';
import { View } from 'react-native';
import { useDispatch } from '../../../redux/hook';
import { TextInput, TouchableOpacity } from '../../native-component';
import { addToShoppingList } from '../../../redux/slice/shoppingList';
import { initialFoodInfo } from '../../../constant/foods';
import Icon from 'react-native-vector-icons/AntDesign';
import tw from 'twrnc';
import { DEEP_INDIGO } from '../../../constant/colors';

export default function TextInputToAddList() {
  const [foodName, setFoodName] = useState('');
  const dispatch = useDispatch();

  return (
    <View style={tw`my-2`}>
      <TextInput
        value={foodName}
        onChangeText={setFoodName}
        styletw='h-12 rounded-3xl px-5'
        placeholder='장보기 목록에 추가할 식료품을 작성해주세요.'
        returnKeyType='done'
        onSubmitEditing={() => {
          if (foodName === '') return;
          dispatch(addToShoppingList({ ...initialFoodInfo, name: foodName }));
          setFoodName('');
        }}
        blurOnSubmit={false}
      />
      <TouchableOpacity
        style={tw`absolute right-3 top-3`}
        onPress={() => {
          if (foodName === '') return;
          dispatch(addToShoppingList({ ...initialFoodInfo, name: foodName }));
          setFoodName('');
        }}
      >
        <Icon name='pluscircle' size={22} color={DEEP_INDIGO} />
      </TouchableOpacity>
    </View>
  );
}
