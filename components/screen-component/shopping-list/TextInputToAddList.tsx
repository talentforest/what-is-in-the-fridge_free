import { useState } from 'react';
import { View } from 'react-native';
import { useDispatch } from '../../../redux/hook';
import { TextInput, TouchableOpacity } from '../../native-component';
import { addToShoppingList } from '../../../redux/slice/shoppingList';
import { initialFoodInfo } from '../../../constant/foods';
import { INDIGO } from '../../../constant/colors';
import { scaleH } from '../../../util';
import UUIDGenerator from 'react-native-uuid';
import Icon from '../../native-component/Icon';
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
    <View
      style={tw`my-2 h-[${scaleH(
        11
      )}]px border border-slate-400 rounded-full flex-row items-center bg-white justify-between`}
    >
      <TextInput
        value={foodName}
        onChangeText={setFoodName}
        style={tw`rounded-full border-0 flex-1 pl-3`}
        placeholder='장보기 목록에 추가할 식료품을 작성해주세요.'
        returnKeyType='done'
        onSubmitEditing={onSubmitEditing}
        blurOnSubmit={false}
      />
      <TouchableOpacity onPress={onSubmitEditing} style={tw`pr-2`}>
        <Icon type='AntDesign' name='plus' size={24} color={INDIGO} />
      </TouchableOpacity>
    </View>
  );
}
