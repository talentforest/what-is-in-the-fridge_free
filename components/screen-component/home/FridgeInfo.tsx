import { View } from 'react-native';
import { Text } from '../../native-component';
import { useSelector } from '../../../redux/hook';
import useGetFoodList from '../../../hooks/useGetFoodList';
import FridgeInfoBox from './FridgeInfoBox';
import tw from 'twrnc';

export default function FridgeInfo() {
  const { shoppingList } = useSelector((state) => state.shoppingList);
  const { getFoodList } = useGetFoodList();

  return (
    <View style={tw`mb-2 flex-1`}>
      <Text style={tw`text-indigo-600 mt-2`}>나의 냉장고 정보</Text>
      <View style={tw`gap-1 flex-1 mt-3`}>
        <View style={tw`gap-1 flex-row flex-1`}>
          <FridgeInfoBox
            iconName='fridge-bottom'
            name='냉동실 식료품'
            foodLength={getFoodList('냉동실').length}
          />
          <FridgeInfoBox
            iconName='fridge-top'
            name='냉장실 식료품'
            foodLength={getFoodList('냉장실').length}
          />
        </View>
        <FridgeInfoBox
          iconName='basket-outline'
          name='장보기 목록 식료품'
          foodLength={shoppingList.length}
        />
      </View>
    </View>
  );
}
