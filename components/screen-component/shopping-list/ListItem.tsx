import { useState } from 'react';
import { View } from 'react-native';
import { Food, initialFoodInfo } from '../../../constant/foods';
import { Text } from '../../native-component';
import { getISODate } from '../../../util';
import { removeFromShoppingList } from '../../../redux/slice/shoppingList';
import { useDispatch } from '../../../redux/hook';
import AddFoodModalBtn from '../compartments/AddFoodModalBtn';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/AntDesign';
import UUIDGenerator from 'react-native-uuid';
import IconBtn from '../../common/IconBtn';

interface Props {
  food: Food;
}

export default function ListItem({ food }: Props) {
  const [selectedFood, setSelectedFood] = useState<Food>(initialFoodInfo);

  const dispatch = useDispatch();
  const myUuid = UUIDGenerator.v4();

  return (
    <View
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
      <IconBtn
        iconName='delete'
        onPress={() => dispatch(removeFromShoppingList({ name: food.name }))}
      />
    </View>
  );
}
