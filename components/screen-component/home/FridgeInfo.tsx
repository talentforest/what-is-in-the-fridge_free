import { View } from 'react-native';
import { Text } from '../../native-component';
import { DEEP_YELLOW, INDIGO } from '../../../constant/colors';
import { useSelector } from '../../../redux/hook';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import useGetFoodList from '../../../hooks/useGetFoodList';
import tw from 'twrnc';
import FridgeInfoBox from './FridgeInfoBox';

export default function FridgeInfo() {
  const { shoppingList } = useSelector((state) => state.shoppingList);
  const { getFoodList } = useGetFoodList();

  return (
    <View style={tw`mb-2`}>
      <Text styletw='text-base text-indigo-600 mt-2'>나의 냉장고 정보</Text>
      <View style={tw`w-full my-2 justify-start gap-1`}>
        <View style={tw`gap-1 flex-row`}>
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
