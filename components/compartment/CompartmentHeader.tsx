import { View } from 'react-native';
import { Text } from '../common/native-component';
import { Food, MAX_LIMIT, initialFridgeFood } from '../../constant/foodInfo';
import { useDispatch, useSelector } from '../../redux/hook';
import { useFindFood, useHandleAlert } from '../../hooks';
import { setFormFood } from '../../redux/slice/food/formFoodSlice';
import { showOpenAddFoodModal } from '../../redux/slice/modalVisibleSlice';
import { CompartmentNum } from '../../constant/fridgeInfo';

import AddIconBtn from '../buttons/AddIconBtn';
import tw from 'twrnc';

interface Props {
  compartmentNum?: CompartmentNum;
  foodList: Food[];
}

export default function CompartmentHeader({ compartmentNum, foodList }: Props) {
  const { purchased } = useSelector((state) => state.purchaseState);

  const { allFoods } = useFindFood();

  const { alertReachedLimit, setAlert } = useHandleAlert();

  const dispatch = useDispatch();

  const onPress = () => {
    if (!purchased && allFoods.length >= MAX_LIMIT) {
      setAlert(alertReachedLimit);
      return;
    }
    dispatch(setFormFood(initialFridgeFood));
    dispatch(showOpenAddFoodModal({ modalVisible: true, compartmentNum }));
  };

  return (
    <View>
      <View style={tw`flex-row justify-between items-center pl-2.5 h-7.5`}>
        <Text
          fontSize={16}
          style={tw`${foodList.length ? 'text-blue-600' : 'text-slate-400'}`}
        >
          {compartmentNum ? `${compartmentNum}칸` : '실온보관'} / 식료품{' '}
          {foodList.length}개
        </Text>

        <AddIconBtn onPress={onPress} />
      </View>
    </View>
  );
}
