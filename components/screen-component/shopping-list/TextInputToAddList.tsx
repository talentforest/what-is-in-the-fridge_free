import { useState } from 'react';
import { View } from 'react-native';
import { useDispatch } from '../../../redux/hook';
import { TextInput, TouchableOpacity } from '../../native-component';
import { addToShoppingList } from '../../../redux/slice/shoppingList';
import { initialFoodInfo } from '../../../constant/foods';
import { INDIGO } from '../../../constant/colors';
import UUIDGenerator from 'react-native-uuid';
import Icon from 'react-native-vector-icons/AntDesign';
import tw from 'twrnc';

export default function TextInputToAddList() {
  const [foodName, setFoodName] = useState('');

  const dispatch = useDispatch();
  const myUuid = UUIDGenerator.v4();

  const onSubmitEditing = () => {
    if (foodName === '') return;
    dispatch(
      addToShoppingList({
        ...initialFoodInfo,
        id: myUuid as string,
        name: foodName,
      })
    );
    setFoodName('');
  };

  return (
    <View style={tw`my-2 mx-4 h-12`}>
      <TextInput
        value={foodName}
        onChangeText={setFoodName}
        styletw='rounded-3xl px-5'
        placeholder='장보기 목록에 추가할 식료품을 작성해주세요.'
        returnKeyType='done'
        onSubmitEditing={onSubmitEditing}
        blurOnSubmit={false}
      />
      <TouchableOpacity
        style={tw`absolute bottom-3.5 right-2`}
        onPress={onSubmitEditing}
      >
        <Icon name='pluscircle' size={24} color={INDIGO} />
      </TouchableOpacity>
    </View>
  );
}
