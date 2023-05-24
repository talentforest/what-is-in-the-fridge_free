import { useState } from 'react';
import { Image, View } from 'react-native';
import { Food, initialFoodInfo } from '../../../constant/foods';
import { Text, TouchableOpacity } from '../../native-component';
import { removeFromShoppingList } from '../../../redux/slice/shoppingList';
import { useDispatch, useSelector } from '../../../redux/hook';
import { DEEP_INDIGO, INDIGO } from '../../../constant/colors';
import { select } from '../../../redux/slice/selectedFoodSlice';
import Icon from 'react-native-vector-icons/AntDesign';
import IconBtn from '../../common/IconBtn';
import AddSelectFoodModal from '../../modal/AddSelectFoodModal';
import tw from 'twrnc';

interface Props {
  food: Food;
}

export default function ShoppingItem({ food }: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();

  const onPress = (food: Food) => {
    dispatch(select(food));
    setModalVisible(true);
  };

  return (
    <View
      style={tw`flex-row items-center gap-2 p-3 mb-1 border border-slate-300 w-full rounded-lg bg-white`}
    >
      <Icon name='checksquareo' size={18} color={INDIGO} />
      <Text styletw='text-indigo-600 flex-1'>{food.name}</Text>
      <TouchableOpacity onPress={() => onPress(food)}>
        <Icon name='plus' size={20} color={DEEP_INDIGO} />
      </TouchableOpacity>
      {modalVisible && (
        <AddSelectFoodModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      )}
      <IconBtn
        iconName='delete'
        onPress={() => {
          dispatch(removeFromShoppingList({ name: food.name }));
        }}
      />
    </View>
  );
}
