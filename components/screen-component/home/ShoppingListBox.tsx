import { View } from 'react-native';
import { useSelector } from '../../../redux/hook';
import { useState } from 'react';
import { DEEP_INDIGO } from '../../../constant/colors';
import { Text, TouchableOpacity } from '../../native-component';
import tw from 'twrnc';
import Title from '../../common/Title';
import FoodBox from '../../common/FoodBox';
import Icon from '../../native-component/Icon';
import Box from '../../common/Box';

export default function ShoppingListBox() {
  const [isOpen, setIsOpen] = useState(false);
  const { shoppingList } = useSelector((state) => state.shoppingList);

  return (
    <Box bgColor='bg-indigo-500'>
      <Title title={`장봐야할 목록`} iconName='cart-outline' />

      <Text style={tw`text-white mt-2.5`}>
        카트에 넣으신 식료품을 터치해주세요.
      </Text>

      <View style={tw`gap-1.5 flex-row flex-wrap items-center mt-4 mb-2`}>
        {shoppingList.slice(0, 8).map((food) => (
          <FoodBox key={food.id} food={food} />
        ))}
        {isOpen &&
          shoppingList
            .slice(8)
            .map((food) => <FoodBox key={food.id} food={food} />)}
        <TouchableOpacity
          onPress={() => setIsOpen((prev) => !prev)}
          style={tw`border border-indigo-400 bg-amber-300 p-1 rounded-full`}
        >
          <Icon
            name={isOpen ? 'chevron-up' : 'chevron-down'}
            type='MaterialCommunityIcons'
            size={24}
            color={DEEP_INDIGO}
          />
        </TouchableOpacity>
      </View>
    </Box>
  );
}
